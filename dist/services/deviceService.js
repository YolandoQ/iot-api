"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deviceRepository_1 = __importDefault(require("../repositories/deviceRepository"));
class DeviceService {
    get() {
        return deviceRepository_1.default.find({});
    }
    ;
    getByid(_id) {
        return deviceRepository_1.default.findById(_id);
    }
    create(device) {
        return deviceRepository_1.default.create(device);
    }
    update(_id, device) {
        return deviceRepository_1.default.findByIdAndUpdate(_id, { $set: device }, { new: true });
    }
    delete(_id) {
        return deviceRepository_1.default.findByIdAndRemove(_id);
    }
}
exports.default = new DeviceService();
