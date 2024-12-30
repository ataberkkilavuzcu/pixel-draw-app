import { Canvas } from './canvas';
import { WebSocketClient } from './webSocketClient';

const canvas = new Canvas();
const webSocketClient = new WebSocketClient();

canvas.initialize();
webSocketClient.connect();

let isDrawing = false;

webSocketClient.onMessage((event) => {
    const drawingEvent = JSON.parse(event.data);
    canvas.draw(drawingEvent);
});

document.getElementById('clearButton')?.addEventListener('click', () => {
    canvas.clear();
});

canvas.getCanvasElement().addEventListener('mousedown', (event) => {
    isDrawing = true;
    const drawingData = canvas.getDrawingData(event);
    canvas.draw(drawingData);
    webSocketClient.send(JSON.stringify(drawingData));
});

canvas.getCanvasElement().addEventListener('mousemove', (event) => {
    if (!isDrawing) return;
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