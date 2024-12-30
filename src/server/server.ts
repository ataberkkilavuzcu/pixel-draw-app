import express from 'express';
import { WebSocketServer } from 'ws';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../public')));

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws) {
                client.send(data.toString());
            }
        });
    });
});