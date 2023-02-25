"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const websocket_1 = __importDefault(require("./websocket/websocket"));
const db_1 = __importDefault(require("./helpers/db"));
const deviceController_1 = __importDefault(require("./controllers/deviceController"));
class StartUp {
    constructor() {
        this.app = (0, express_1.default)();
        this.db = new db_1.default();
        this.db.createConnection();
        this.middleware();
        this.routes();
        this.initWebSocketServer();
    }
    middleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send({ version: '0.1' });
        });
        this.app.route('/api/v1/device')
            .get(deviceController_1.default.get)
            .post(deviceController_1.default.create);
        this.app.route('/api/v1/device/:id')
            .get(deviceController_1.default.getById)
            .put(deviceController_1.default.update)
            .delete(deviceController_1.default.delete);
    }
    initWebSocketServer() {
        this.wsServer = websocket_1.default;
        this.wsServer.start();
    }
}
exports.default = new StartUp().app;
