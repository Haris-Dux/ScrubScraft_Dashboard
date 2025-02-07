import mongoose from "mongoose";
const { Schema } = mongoose;

const pricingSchema = new Schema({
  nanme: {
    type: String,
    required: [true, "Name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
});

export const pricingModel = mongoose.model("Pricings", pricingSchema);
