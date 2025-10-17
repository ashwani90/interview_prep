import { io } from 'socket.io-client';

class MetricsService {
  constructor() {
    this.socket = null;
    this.subscribers = new Set();
    this.isPaused = false;
    this.buffer = [];
  }

  connect() {
    this.socket = io('http://localhost:3001'); // Replace with your WebSocket URL
    this.socket.on('connect', () => {
      console.log('Connected to metrics server');
      this.socket.on('metrics', (data) => {
        if (this.isPaused) {
          this.buffer.push(data);
        } else {
          this.notifySubscribers(data);
        }
      });
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  notifySubscribers(data) {
    this.subscribers.forEach(callback => callback(data));
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.buffer.forEach(data => this.notifySubscribers(data));
    this.buffer = [];
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const metricsService = new MetricsService();