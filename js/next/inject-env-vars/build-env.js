// scripts/build-env.js
#!/usr/bin/env node

const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Validate environment
const { validateEnv, getClientEnv } = require('../lib/env');

try {
  console.log('🔧 Building environment configuration...');
  
  // Validate required environment variables
  validateEnv();
  
  const clientEnv = getClientEnv();
  
  // Create public directory if it doesn't exist
  const publicDir = join(process.cwd(), 'public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }
  
  // Generate environment config file for client-side access
  const envConfig = {
    buildTime: new Date().toISOString(),
    environment: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    config: clientEnv,
  };
  
  writeFileSync(
    join(publicDir, 'env-config.json'),
    JSON.stringify(envConfig, null, 2)
  );
  
  // Generate TypeScript definitions
  const typeDefinitions = `// Generated environment types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server-side environment variables
      ${Object.keys(process.env)
        .filter(key => !key.startsWith('NEXT_PUBLIC_'))
        .map(key => `${key}?: string;`)
        .join('\n      ')}
      
      // Client-side environment variables
      ${Object.keys(clientEnv)
        .map(key => `${key}: string;`)
        .join('\n      ')}
    }
  }
  
  interface Window {
    __ENV: ${JSON.stringify(clientEnv, null, 2)};
  }
}

export {};
`;
  
  writeFileSync(
    join(process.cwd(), 'types', 'env.d.ts'),
    typeDefinitions
  );
  
  console.log('✅ Environment configuration built successfully!');
  console.log('📁 Generated: public/env-config.json');
  console.log('📁 Generated: types/env.d.ts');
  
} catch (error) {
  console.error('❌ Failed to build environment configuration:', error.message);
  process.exit(1);
}