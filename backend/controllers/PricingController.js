import { pricingModel } from "../models/PricingModel.js";
import { setMongoose } from "../utils/Mongoose.js";

export const getPricing = async (req, res) => {
  try {
    const pricing = await pricingModel.find({});
    setMongoose();
    return res.status(200).json(pricing);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching pricing data" });
  }
};

// Update price only
export const updatePricing = async (req, res) => {
  try {
    const { amount, id } = req.body;

    if (!amount && amount !== 0) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const updatedPricing = await pricingModel.findByIdAndUpdate(
      id,
      { $set: { amount } },
      { new: true, runValidators: true }
    );

    if (!updatedPricing) {
      return res.status(404).json({ error: "Pricing entry not found" });
    }
    setMongoose();
    return res
      .status(200)
      .json({
        success: true,
        message: "Price Updated successfully",
        data: updatedPricing,
      });
  } catch (error) {
    return res.status(500).json({ error: "Error updating pricing" });
  }
};
