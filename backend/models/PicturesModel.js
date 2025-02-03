import mongoose from "mongoose";
const { Schema } = mongoose;

//CATEGORIES

const sizePicturesSchema = new Schema(
  {
    image: {
      downloadURL: { type: String, required: [true, "Image link required"] },
      name: { type: String },
      type: { type: String },
    },
  },
  { timestamps: true }
);

export const sizePicturesModel = mongoose.model("Size Pictures", sizePicturesSchema);


