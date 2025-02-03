import mongoose from "mongoose";
const { Schema } = mongoose;

//CATEGORIES

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Ctategory Name"],
      unique: true,
    },
  },
  { timestamps: true }
);

export const CategoriesModel = mongoose.model("Categories", categoriesSchema);

//COLORS

const colorsSchema = new Schema(
  {
    label: {
      type: String,
      required: [true, "Please Provide Color Name"],
      unique: true,
    },
    value: {
      type: String,
      required: [true, "Please Provide Color Value"],
    },
  },
  { timestamps: true }
);

export const ColorsModel = mongoose.model("Colors", colorsSchema);

//FABRICS

const fabricSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Fabric Name"],
      unique: true,
    },
  },
  { timestamps: true }
);

export const fabricsModel = mongoose.model("Fabrics", fabricSchema);
