import mongoose from "mongoose";
import { generateUniqueOrderId } from "../utils/GenerateId.js";

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: [true, "Order items required"],
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: [true, "userID required"],
    },
    name: {
      type: String,
      required: [true, "name required"],
    },
    address: {
      type: String,
      required: [true, "address required"],
    },
    phone: {
      type: String,
      required: [true, "phone required"],
    },
    totalAmount: { type: Number, required: [true, "Total Amount required"] },
    OrderID: {
      type: String,
      unique: true,
    },
    orderProgress: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Delivered", "Dispatched", "Cancelled"],
    },
    postal_code: {
      type: String,
      required: [true, "postal code required"],
    },
    city: {
      type: String,
      required: [true, "city required"],
    },
    area: {
      type: String,
      required: [true, "area required"],
    },
    province: {
      type: String,
      required: [true, "province required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
    },
    delivery_instruction: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (this.isNew || !this.OrderID) {
    const uniqueOrderID = await generateUniqueOrderId();
    this.OrderID = uniqueOrderID;
  }
  next();
});

export const OrdersModel = mongoose.model("Orders", orderSchema);
