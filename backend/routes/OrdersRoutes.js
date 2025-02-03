import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/OrdersController.js";

const orderRouter = express.Router();

orderRouter.post("/orders/updateOrder", updateOrder);
orderRouter.post("/orders/getAllOrders", getAllOrders);
orderRouter.get("/orders/getOrderById/:id", getOrderById);


export default orderRouter;
