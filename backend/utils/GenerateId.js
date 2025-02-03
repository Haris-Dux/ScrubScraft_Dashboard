import { OrdersModel } from "../models/OrdersModel.js";

async function generateUniqueOrderId() {
  const prefix = "GLY-";
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const candidateCustomerId = `${prefix}${randomSuffix}`;
  const existingUser = await OrdersModel.findOne({
    OrderID: OrderID,
  });
  if (existingUser) {
    return generateUniqueOrderId();
  }
  return candidateCustomerId;
};

export {
  generateUniqueOrderId
};
