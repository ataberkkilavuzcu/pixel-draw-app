import { DrawingEvent } from "../types";

export class Canvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private pixelSize: number = 10;

    constructor() {
        this.canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d')!;
    }

    initialize() {
        // Use the dimensions specified in HTML
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.clear();
    }

    getDrawingData(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / this.pixelSize) * this.pixelSize;
        const y = Math.floor((event.clientY - rect.top) / this.pixelSize) * this.pixelSize;
        const color = (document.getElementById('colorPicker') as HTMLInputElement).value;
        
        return { x, y, color, size: this.pixelSize };
    }

    draw({ x, y, color, size }: DrawingEvent) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, size, size);
    }

    getCanvasElement(): HTMLCanvasElement {
        return this.canvas;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}