/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/canvas.ts":
/*!******************************!*\
  !*** ./src/client/canvas.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/client/webSocketClient.ts":
/*!***************************************!*\
  !*** ./src/client/webSocketClient.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebSocketClient = void 0;
class WebSocketClient {
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
    onMessage(callback) {
        this.ws.onmessage = callback;
    }
    send(data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        }
    }
}
exports.WebSocketClient = WebSocketClient;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/client/index.ts ***!
  \*****************************/

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const canvas_1 = __webpack_require__(/*! ./canvas */ "./src/client/canvas.ts");
const webSocketClient_1 = __webpack_require__(/*! ./webSocketClient */ "./src/client/webSocketClient.ts");
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map