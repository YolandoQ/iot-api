import { Schema, Model, DefaultSchemaOptions } from "mongoose";

class Helper {
  
  responseJson = function (res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; data: {}; }): void; new(): any; }; }; }, code: number, success: boolean, message: string, data: any = {}) {
    res.status(code).json({
      success: success,
      message: message,
      data: data,
    });
  };

  validateRequiredFields = function (schema, data: { [x: string]: any; }) {

    const missingFields: string[] = [];
    const requiredFields: string[] = this.getRequiredFields(schema);

    requiredFields.forEach((field: string) => {
      if (!data[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(
        ", "
      )}.`;
      throw new Error(errorMessage);
    }
  };

  getRequiredFields = function (schema: { paths: { [x: string]: { isRequired: boolean; }; }; }) {
    const requiredFields: string[] = [];

    for (const path in schema.paths) {
      if (schema.paths[path].isRequired) {
        requiredFields.push(path);
      }
    }

    return requiredFields;
  };

  
}

export default new Helper();
