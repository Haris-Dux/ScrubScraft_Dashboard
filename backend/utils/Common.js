
export const verifyrequiredparams = ( body, fields) => {
    try {
      let error = false;
      let error_fields = "";
      if (body.length < 1) {
        throw new Error('Body is Missing')
      }
      const element = Object.getOwnPropertyNames(body);
      for (const field of fields) {
        if (element.some((e) => e == field)) {
          if (Object.keys(body[field]).length === 0) {
            if (typeof body[field] == "number") {
              continue;
            } else {
              error = true;
              error_fields += field + ", ";
            }
          }
          continue;
        } else {
          error = true;
          error_fields += field + ", ";
        }
      }
      if (error) {
        throw new Error(
            `Required fields : ${error_fields.slice(0, -2)} is missing`);
      } else {
        return Promise.resolve();
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

  



