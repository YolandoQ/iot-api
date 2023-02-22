import deviceService from "../services/deviceService";
import * as httpStatus from "http-status";
import helper from "../helpers/helper";
import deviceSchema from "../models/deviceSchema";

class DeviceController {
    async get(req, res) {
      try {
        const devices = await deviceService.get();
        return helper.responseJson(res, httpStatus.OK, devices);
      } catch (error) {
        return helper.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
      }
    }
  
    async getById(req, res) {
      const _id = req.params.id;
      try {
        const device = await deviceService.getByid(_id);
        if (!device) {
          return helper.responseJson(res, httpStatus.NOT_FOUND, "Device not found");
        }
        return helper.responseJson(res, httpStatus.OK, device);
      } catch (error) {
        return helper.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
      }
    }
  
    async create(req, res) {
      const deviceVm = req.body;
      try {
        helper.validateRequiredFields(deviceSchema, deviceVm);
  
        const createdDevice = await deviceService.create(deviceVm);
        return helper.responseJson(res, httpStatus.OK, "Device registered.");
      } catch (error) {
        return helper.responseJson(res, httpStatus.BAD_REQUEST, error.message);
      }
    }
  
    async update(req, res) {
      const _id = req.params.id;
      const deviceVm = req.body;
      try {

        helper.validateRequiredFields(deviceSchema, deviceVm);
  
        const updatedDevice = await deviceService.update(_id, deviceVm);
        if (!updatedDevice) {
          return helper.responseJson(res, httpStatus.NOT_FOUND, "Device not found");
        }
        return helper.responseJson(res, httpStatus.OK, "Device updated.");
      } catch (error) {
        return helper.responseJson(res, httpStatus.BAD_REQUEST, error.message);
      }
    }

  async delete(req, res) {
    const _id = req.params.id;
    try {
      const deletedDevice = await deviceService.delete(_id);
      if (!deletedDevice) {
        return helper.responseJson(res, httpStatus.NOT_FOUND, "Device not found");
      }
      return helper.responseJson(res, httpStatus.OK, "Device deleted.");
    } catch (error) {
      return helper.responseJson(res, httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
  }
}

export default new DeviceController();