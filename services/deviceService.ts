import deviceRepository from "../repositories/deviceRepository";

class DeviceService {

    get() {
        return deviceRepository.find({});
    };

    getByid(_id) {
        return deviceRepository.findById(_id);
    }

    create(device) {
        return deviceRepository.create(device);
    }

    update(_id, device) {
        return deviceRepository.findByIdAndUpdate(_id, device);
    }

    delete(_id) {
        return deviceRepository.findByIdAndRemove(_id);
    }
 }

export default new DeviceService();