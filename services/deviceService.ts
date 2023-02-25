import { UpdateQuery } from "mongoose";
import deviceRepository from "../repositories/deviceRepository";

class DeviceService {

    get() {
        return deviceRepository.find({});
    };

    getByid(_id: string) {
        return deviceRepository.findById(_id);
    }

    create(device: string) {
        return deviceRepository.create(device);
    }

    update(_id: string, device: UpdateQuery<{ [x: string]: any; }>) {
        return deviceRepository.findByIdAndUpdate(
            _id, 
            { $set: device },
            { new: true }
        );
    }

    delete(_id: string) {
        return deviceRepository.findByIdAndRemove(_id);
    }
 }

export default new DeviceService();