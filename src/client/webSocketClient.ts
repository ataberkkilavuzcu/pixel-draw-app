export class WebSocketClient {
    private ws: WebSocket;

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

    onMessage(callback: (event: MessageEvent) => void) {
        this.ws.onmessage = callback;
    }

    send(data: string) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
    }
}