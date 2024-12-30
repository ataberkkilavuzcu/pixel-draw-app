"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    constructor() {
        this.pixelSize = 10;
        this.canvas = document.getElementById('drawingCanvas');
        this.context = this.canvas.getContext('2d');
    }
    initialize() {
        // Use the dimensions specified in HTML
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.clear();
    }
    getDrawingData(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / this.pixelSize) * this.pixelSize;
        const y = Math.floor((event.clientY - rect.top) / this.pixelSize) * this.pixelSize;
        const color = document.getElementById('colorPicker').value;
        return { x, y, color, size: this.pixelSize };
    }
    draw({ x, y, color, size }) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, size, size);
    }
    getCanvasElement() {
        return this.canvas;
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
exports.Canvas = Canvas;
