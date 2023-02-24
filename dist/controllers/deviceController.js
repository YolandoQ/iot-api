"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus = require("http-status");
const helper_1 = require("../helpers/helper");
const deviceSchema_1 = require("../models/deviceSchema");
const deviceService_1 = require("../services/deviceService");
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
                if (!device) {
                    return helper_1.default.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
                }
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Request made successfully", device);
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceVm = req.body;
            try {
                helper_1.default.validateRequiredFields(deviceSchema_1.default, deviceVm);
                const createdDevice = yield deviceService_1.default.create(deviceVm);
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
                helper_1.default.validateRequiredFields(deviceSchema_1.default, deviceVm);
                const updatedDevice = yield deviceService_1.default.update(_id, deviceVm);
                if (!updatedDevice) {
                    return helper_1.default.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
                }
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
                if (!deletedDevice) {
                    return helper_1.default.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
                }
                return helper_1.default.responseJson(res, httpStatus.OK, true, "Device deleted");
            }
            catch (error) {
                return helper_1.default.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
            }
        });
    }
}
exports.default = new DeviceController();
