import mongoose from "mongoose";

const imageSchema = {
  downloadURL: { type: String, required: [true, "Image link required"] },
  name: { type: String },
  type: { type: String },
};

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    description: {
      type: String,
      required: [true, "Description required"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    sale_price: {
      type: Number,
      default: 0,
    },
    product_code: {
      type: String,
      required: [true, "product_code required"],
    },
    category: {
      type: String,
      required: [true, "category required"],
    },
    colors: [
      {
        label: {
          type: String,
          required: [true, "color label required"],
        },
        value: {
          type: String,
          required: [true, "color value required"],
        },
      },
    ],
    sizes: [
      {
        type: String,
        required: [true, "size required"],
      },
    ],
    fabric_type: [
      {
        type: String,
        required: [true, "fabric type required"],
      },
    ],
    latest: {
      type: Boolean,
      default: false,
    },
    images: {
      primary: imageSchema,
      image2: imageSchema,
      image3: imageSchema,
      image4: imageSchema,
    },
  },
  { timestamps: true }
);

export const ProductsModel = mongoose.model("Products", productsSchema);
