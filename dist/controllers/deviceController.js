"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = __importStar(require("http-status"));
const helper_1 = __importDefault(require("../helpers/helper"));
const deviceSchema_1 = __importDefault(require("../models/deviceSchema"));
const deviceService_1 = __importDefault(require("../services/deviceService"));
const websocket_1 = __importDefault(require("../websocket/websocket"));
class DeviceController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield deviceService_1.default.get();
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Request made successfully", devices);
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            try {
                const device = yield deviceService_1.default.getByid(_id);
                if (!device)
                    return helper_1.default.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Request made successfully", device);
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deviceVm = req.body;
                helper_1.default.validateRequiredFields(deviceSchema_1.default, deviceVm);
                const createdDevice = yield deviceService_1.default.create(deviceVm);
                websocket_1.default.sendNotification(`A device has been created: ` + JSON.stringify(deviceVm));
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Device registered");
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.BAD_REQUEST, false, error.message);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const deviceVm = req.body;
            try {
                // helper.validateRequiredFields(deviceSchema, deviceVm);
                const updatedDevice = yield deviceService_1.default.update(_id, deviceVm);
                if (!updatedDevice)
                    return helper_1.default.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
                websocket_1.default.sendNotification(`Device ${_id} has been updated to: ` + JSON.stringify(deviceVm));
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Device updated");
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.BAD_REQUEST, false, error.message);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            try {
                const deletedDevice = yield deviceService_1.default.delete(_id);
                if (!deletedDevice)
                    return helper_1.default.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
                websocket_1.default.sendNotification(`Device ${_id} has been deleted`);
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Device deleted");
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
            }
        });
    }
}
exports.default = new DeviceController();
