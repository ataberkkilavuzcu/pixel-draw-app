import WebSocket from 'ws';

interface DrawingEvent {
    x: number;
    y: number;
    color: string;
}

const clients: WebSocket[] = [];

export function setupWebSocket(server: any) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws: WebSocket) => {
        clients.push(ws);

        ws.on('message', (message: string) => {
            const drawingEvent: DrawingEvent = JSON.parse(message);
            broadcast(drawingEvent);
        });

        ws.on('close', () => {
            const index = clients.indexOf(ws);
            if (index !== -1) {
                clients.splice(index, 1);
            }
        });
    });
}

function broadcast(event: DrawingEvent) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event));
        }
    });
}