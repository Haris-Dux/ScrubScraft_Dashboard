import mongoose from "mongoose";

export const setMongoose = () => {
    return mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, returnValue) => {
        delete returnValue._id;
        delete returnValue.__v;
        delete returnValue.password;
        delete returnValue.admin;
      },
    });
  };