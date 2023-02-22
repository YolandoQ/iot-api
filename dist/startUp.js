"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db_1 = require("./helpers/db");
const bodyParser = require("body-parser");
const deviceController_1 = require("./controllers/deviceController");
class startUp {
    constructor() {
        this.app = express();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.1' });
        });
        this.app.route("/api/v1/device").get(deviceController_1.default.get);
        this.app.route("/api/v1/device/:id").get(deviceController_1.default.getById);
        this.app.route("/api/v1/device").post(deviceController_1.default.create);
        this.app.route("/api/v1/device/:id").put(deviceController_1.default.update);
        this.app.route("/api/v1/device/:id").delete(deviceController_1.default.delete);
    }
}
exports.default = new startUp();
