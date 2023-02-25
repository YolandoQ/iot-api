"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
class WebSocketServer {
    constructor() {
        this.wsServer = new ws_1.default.Server({ port: 3051 });
    }
    start() {
        this.wsServer.on("connection", (ws) => {
            ws.send("WebSocket server started");
        });
    }
    sendNotification(message) {
        this.wsServer.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(message);
            }
        });
    }
}
exports.default = new WebSocketServer();
