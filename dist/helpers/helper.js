"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    constructor() {
        this.responseJson = function (res, code, data) {
            res.status(code).json({
                result: data,
            });
        };
        this.validateRequiredFields = function (schema, data) {
            const missingFields = [];
            const requiredFields = this.getRequiredFields(schema);
            requiredFields.forEach((field) => {
                if (!data[field]) {
                    missingFields.push(field);
                }
            });
            if (missingFields.length > 0) {
                const errorMessage = `Missing required fields: ${missingFields.join(", ")}.`;
                throw new Error(errorMessage);
            }
        };
        this.getRequiredFields = function (schema) {
            const requiredFields = [];
            for (const path in schema.paths) {
                if (schema.paths[path].isRequired) {
                    requiredFields.push(path);
                }
            }
            return requiredFields;
        };
    }
}
exports.default = new Helper();
