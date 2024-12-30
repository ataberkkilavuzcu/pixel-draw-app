"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./canvas");
const webSocketClient_1 = require("./webSocketClient");
const canvas = new canvas_1.Canvas();
const webSocketClient = new webSocketClient_1.WebSocketClient();
canvas.initialize();
webSocketClient.connect();
let isDrawing = false;
webSocketClient.onMessage((event) => {
    const drawingEvent = JSON.parse(event.data);
    canvas.draw(drawingEvent);
});
(_a = document.getElementById('clearButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    canvas.clear();
});
canvas.getCanvasElement().addEventListener('mousedown', (event) => {
    isDrawing = true;
    const drawingData = canvas.getDrawingData(event);
    canvas.draw(drawingData);
    webSocketClient.send(JSON.stringify(drawingData));
});
canvas.getCanvasElement().addEventListener('mousemove', (event) => {
    if (!isDrawing)
        return;
    const drawingData = canvas.getDrawingData(event);
    canvas.draw(drawingData);
    webSocketClient.send(JSON.stringify(drawingData));
});
canvas.getCanvasElement().addEventListener('mouseup', () => {
    isDrawing = false;
});
canvas.getCanvasElement().addEventListener('mouseleave', () => {
    isDrawing = false;
});
