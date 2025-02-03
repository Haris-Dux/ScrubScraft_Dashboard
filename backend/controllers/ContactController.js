import { Support } from "../models/ContactModel.js";
import { setMongoose } from "../utils/Mongoose.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = 100;
 
    const data = await Support.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Support.countDocuments();
    const response = {
      totalPages:Math.ceil(total / limit),
      page,
      data,
    };
    setMongoose();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



