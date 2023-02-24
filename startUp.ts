import * as express from 'express';
import * as bodyParser from 'body-parser';
import Database from './helpers/db';
import deviceController from './controllers/deviceController';

class startUp {
    
    public app: express.Application;
    private _db: Database;

    constructor() {
        this.app = express();
        this._db = new Database();
        this._db.createConnection();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ version : '0.1'});
        });

        this.app.route("/api/v1/device").get(deviceController.get);
        this.app.route("/api/v1/device/:id").get(deviceController.getById);
        this.app.route("/api/v1/device").post(deviceController.create);
        this.app.route("/api/v1/device/:id").put(deviceController.update);
        this.app.route("/api/v1/device/:id").delete(deviceController.delete);

    }

}

export default new startUp(); 