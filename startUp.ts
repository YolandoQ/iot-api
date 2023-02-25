import express, { Application } from 'express';
import bodyParser from 'body-parser';
import WebSocketServer from "./websocket/websocket";
import Database from './helpers/db';
import deviceController from './controllers/deviceController';

class StartUp {
    public app: Application;
    private db: Database;
    private wsServer: typeof WebSocketServer;

    constructor() {
        this.app = express();
        this.db = new Database();
        this.db.createConnection();
        this.middleware();
        this.routes();
        this.initWebSocketServer();
    }

    private middleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes() {
        this.app.get('/', (req, res) => {
            res.send({ version: '0.1' });
        });

        this.app.route('/api/v1/device')
            .get(deviceController.get)
            .post(deviceController.create);
        
        this.app.route('/api/v1/device/:id')
            .get(deviceController.getById)
            .put(deviceController.update)
            .delete(deviceController.delete);
    }

    private initWebSocketServer() {
        this.wsServer = WebSocketServer;
        this.wsServer.start();
    }
}

export default new StartUp().app;
