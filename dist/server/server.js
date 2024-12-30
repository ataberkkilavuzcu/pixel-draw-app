"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const wss = new ws_1.WebSocketServer({ server });
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
