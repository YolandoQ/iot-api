class Helper {
  responseJson = function (res, code, data) {
    res.status(code).json({
      result: data,
    });
  };

  validateRequiredFields = function (schema, data) {

    const missingFields  = [];
    const requiredFields = this.getRequiredFields(schema);

    requiredFields.forEach((field) => {
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

  getRequiredFields = function (schema) {
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
