"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketClient = void 0;
class WebSocketClient {
    constructor() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.ws = new WebSocket(`${protocol}//${window.location.host}`);
    }
    connect() {
        this.ws.onopen = () => {
            console.log('Connected to server');
        };
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
    onMessage(callback) {
        this.ws.onmessage = callback;
    }
    send(data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
    }
}
exports.WebSocketClient = WebSocketClient;
