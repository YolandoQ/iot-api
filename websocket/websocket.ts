import WebSocket from "ws";

class WebSocketServer {
  private wsServer: WebSocket.Server;

  constructor() {
    this.wsServer = new WebSocket.Server({ port: 3051 });
  }

  start() {
    this.wsServer.on("connection", (ws) => {
      ws.send("WebSocket server started");
    });
  }

  sendNotification(message: string) {
    this.wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export default new WebSocketServer();
