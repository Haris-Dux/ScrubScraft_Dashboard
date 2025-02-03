import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/OrdersController.js";
import { AdminOnly } from "../middleware/Auth.js";

const orderRouter = express.Router();

orderRouter.post("/orders/updateOrder",AdminOnly, updateOrder);
orderRouter.post("/orders/getAllOrders",AdminOnly, getAllOrders);
orderRouter.get("/orders/getOrderById/:id",AdminOnly, getOrderById);


export default orderRouter;
