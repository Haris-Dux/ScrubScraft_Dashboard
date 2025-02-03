import {UserModel} from "../models/User.Model.js";

export const AdminOnly = async (req, res, next) => {
  const id = req.session.userId;
  if (!id) {
    return res.status(401).json({ message: "Please Login First" });
  }
  const user = await UserModel.findById(id);
  if (!user.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};


