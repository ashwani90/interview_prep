import { jwtDecode } from 'jwt-decode';

const AUTH_KEY = 'auth_tokens';
const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  // Initialize auth from storage
  init() {
    const tokens = this.getTokens();
    return tokens ? this.validateToken(tokens.access_token) : null;
  },

  // Get stored tokens
  getTokens() {
    const tokens = localStorage.getItem(AUTH_KEY);
    return tokens ? JSON.parse(tokens) : null;
  },

  // Store tokens
  setTokens(tokens) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(tokens));
    return tokens;
  },

  // Clear auth
  clear() {
    localStorage.removeItem(AUTH_KEY);
  },

  // Validate token expiration
  validateToken(token) {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Start OAuth flow (popup)
  async startOAuthPopup(provider) {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      `${API_URL}/auth/${provider}?popup=true`,
      'oauthPopup',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    return new Promise((resolve, reject) => {
      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          reject(new Error('Popup closed by user'));
        }
      }, 500);

      window.addEventListener('message', (event) => {
        if (event.origin !== API_URL) return;
        clearInterval(checkPopup);
        popup.close();
        
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else {
          resolve(this.setTokens(event.data));
        }
      }, { once: true });
    });
  },

  // Start OAuth flow (redirect)
  startOAuthRedirect(provider) {
    window.location.href = `${API_URL}/auth/${provider}`;
  },

  // Handle OAuth redirect callback
  async handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const tokens = {
      access_token: params.get('access_token'),
      refresh_token: params.get('refresh_token')
    };
    
    if (tokens.access_token) {
      window.history.replaceState({}, document.title, window.location.pathname);
      return this.setTokens(tokens);
    }
    return null;
  },

  // Refresh token
  async refreshToken() {
    const tokens = this.getTokens();
    if (!tokens?.refresh_token) throw new Error('No refresh token');
    
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: tokens.refresh_token })
    });

    if (!response.ok) throw new Error('Token refresh failed');
    
    const newTokens = await response.json();
    return this.setTokens(newTokens);
  }
};