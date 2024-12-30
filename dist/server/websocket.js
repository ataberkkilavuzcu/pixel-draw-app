"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const clients = [];
function setupWebSocket(server) {
    const wss = new ws_1.default.Server({ server });
    wss.on('connection', (ws) => {
        clients.push(ws);
        ws.on('message', (message) => {
            const drawingEvent = JSON.parse(message);
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
exports.setupWebSocket = setupWebSocket;
function broadcast(event) {
    clients.forEach(client => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify(event));
        }
    });
}
