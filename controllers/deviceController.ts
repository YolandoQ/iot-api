import * as httpStatus from "http-status";
import helper from "../helpers/helper";
import deviceSchema from "../models/deviceSchema";
import deviceService from "../services/deviceService";
import WebSocketServer from "../websocket/websocket";

class DeviceController {
  async get(req, res) {
    try {
      const devices = await deviceService.get();
      return helper.responseJson(res, httpStatus.OK, true, "Request made successfully", devices);
    } catch (error) {
      return helper.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
    }
  }

  async getById(req, res) {
    const _id = req.params.id;
    try {
      const device = await deviceService.getByid(_id);
      if (!device) return helper.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
      return helper.responseJson(res, httpStatus.OK, true, "Request made successfully", device);
    } catch (error) {
      return helper.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message
      );
    }
  }

  async create(req, res) {
    try {
      const deviceVm = req.body;
      helper.validateRequiredFields(deviceSchema, deviceVm);

      const createdDevice = await deviceService.create(deviceVm);
      WebSocketServer.sendNotification(`A device has been created: ` + JSON.stringify(deviceVm));
      return helper.responseJson(res, httpStatus.OK, true, "Device registered");      
    } catch (error) {
      return helper.responseJson(res, httpStatus.BAD_REQUEST, false, error.message);
    }
  }

  async update(req, res) {
    const _id = req.params.id;
    const deviceVm = req.body;

    try {
      // helper.validateRequiredFields(deviceSchema, deviceVm);

      const updatedDevice = await deviceService.update(_id, deviceVm);
      if (!updatedDevice)  return helper.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");

      WebSocketServer.sendNotification(`Device ${_id} has been updated to: ` + JSON.stringify(deviceVm));

      return helper.responseJson(res, httpStatus.OK, true, "Device updated");
    } catch (error) {
      return helper.responseJson(res, httpStatus.BAD_REQUEST, false, error.message);
    }
  }

  async delete(req, res) {
    const _id = req.params.id;

    try {
      const deletedDevice = await deviceService.delete(_id);
      if (!deletedDevice) return helper.responseJson(res, httpStatus.NOT_FOUND, false, "Device not found");
      
      WebSocketServer.sendNotification(`Device ${_id} has been deleted`);

      return helper.responseJson(res, httpStatus.OK, true, "Device deleted");
    } catch (error) {
      return helper.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, false, error.message);
    }
  }
}

export default new DeviceController();
