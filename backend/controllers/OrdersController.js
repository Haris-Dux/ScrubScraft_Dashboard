import { OrdersModel } from "../models/OrdersModel.js";
import { setMongoose } from "../utils/Mongoose.js";
import { sendEmail } from "../utils/nodemailer.js";

export const updateOrder = async (req, res, next) => {
  try {
    const { id, orderProgress } = req.body;
    let orderQuery = {};
    if (!id) {
      throw new Error("No Id Provided");
    }
    const order = await OrdersModel.findOne({ _id: id });

    if (!order) {
      throw new Error("No Order Data Found");
    }
    if (orderProgress) {
      orderQuery = { ...orderQuery, orderProgress };
    }
    if (Object.keys(orderQuery).length === 0)
      throw new Error("No fileds Updated");
    const updatedOrder = await OrdersModel.findByIdAndUpdate(id, orderQuery);
    if (updatedOrder) {
      await sendEmail({
        email: updatedOrder.email,
        subject: "Order Update",
        message: `Your order has been updated to ${orderProgress} status`,
      });
    }
    return res.status(200).json({ message: "Order Data Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    let search = req.query.search || "";
    let orderProgress = req.query.status || "All";

    let query = {
      OrderID: { $regex: search, $options: "i" },
    };

    if (orderProgress !== "All") {
      query.orderProgress = orderProgress;
    }

    const orders = await OrdersModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await OrdersModel.countDocuments(query);

    const response = {
      totalPages: Math.ceil(total / limit),
      page,
      orders,
    };
    setMongoose();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "No ID Provided" });
    }

    const order = await OrdersModel.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order Not Found" });
    }
    setMongoose();
    return res.status(200).json([order]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
