import {
  validateOneMinuteExpiry,
  validateOtp,
} from "../middleware/ValidateOtp.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/nodemailer.js";
import { UserModel } from "../models/User.Model.js";
import { OtpModel } from "../models/Otp.Model.js";
import { setMongoose } from "../utils/Mongoose.js";

export const signUp = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!name || !password || !email) throw new Error("Please Fill All fields");
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("User Already Exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });
    res.status(201).json({message: "Sign Up Successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Please provide email and password");
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid Credentials");
    const validPassowrd = await bcrypt.compare(password, user.password);
    if (!validPassowrd) throw new Error("Invalid Credentials");
    if (!user.admin) throw new Error("Unauthorized");
    req.session.userId = user.id;
    setMongoose();
    return res
      .status(200)
      .json({ message: "Login Sucessfull", login: true, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error)
        return res.status(400).json({ message: "Logout Unsuccessfull" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout Successfull" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const persistUserSession = async (req, res, next) => {
  const id = req.session.userId;
  if (!id) {
    return res.status(403).json({ message: "Please Login Again" });
  }
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }
  setMongoose();
  return res.status(200).json({ login: true, user });
};

export const updatePassword = async (req, res, next) => {
  try {
    const { id, oldPassword, newPassword, resetPassword } = req.body;
    let updateQuery = {};
    if (!id) throw new Error("User id Not found");
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User not found");
    if (oldPassword && newPassword) {
      const isValidOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isValidOldPassword) throw new Error("Invalid Old Password");
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      updateQuery = { ...updateQuery, password: hashedNewPassword };
    }
    if (resetPassword) {
      const hashedNewResetPassword = await bcrypt.hash(resetPassword, 10);
      updateQuery = { ...updateQuery, password: hashedNewResetPassword };
    }
    if (Object.keys(updateQuery).length === 0)
      throw new Error("No fields to update");
    await UserModel.findByIdAndUpdate(id, updateQuery);
    return res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const sendResetPasswordOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid Email");
    const g_Otp = Math.floor(100000 + Math.random() * 900000);
    const oldOtpData = await OtpModel.findOne({ userId: user._id });
    if (oldOtpData) {
      const sendNewOtp = await validateOneMinuteExpiry(oldOtpData.timestamp);
      if (!sendNewOtp) throw new Error("Please Try Again After 1 Minute");
    }
    const currentDate = new Date();
    if (oldOtpData) {
      await OtpModel.updateOne(
        { userId: user._id },
        { otp: g_Otp, timestamp: new Date(currentDate.getTime()) }
      );
    } else {
      await OtpModel.create({
        userId: user.id,
        otp: g_Otp,
        timestamp: new Date(currentDate.getTime()),
      });
    };
    await sendEmail({ email, g_Otp });
    return res
      .status(200)
      .json({success:true, message: "OTP has been sent to your email", userId: user.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;
    const otpData = await OtpModel.findOne({ otp: otp, userId: userId });
    if (!otpData) {
      throw new Error("Invalid OTP");
    }
    const verifyOtp = await validateOtp(otpData.timestamp);
    if (verifyOtp) {
      throw new Error("OTP Expired");
    }
    res
      .status(200)
      .json({success:true, message: "OTP Verified Successfully", OtpVerified: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
