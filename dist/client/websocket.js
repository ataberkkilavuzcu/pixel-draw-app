"use strict";
class WebSocketClient {
    constructor(url) {
        this.url = url;
    }
    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
        };
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
        else {
            console.error('WebSocket is not open. Unable to send data.');
        }
    }
    onMessage(callback) {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            callback(data);
        };
    }
}
