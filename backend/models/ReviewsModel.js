import mongoose from 'mongoose'

const reviewsSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      required: [true,"productID required"],
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    review: {
      type: String,
      required: [true,"Review required"],
      default:null,
    },
    rating: {
      type: Number,
      required: [true,"Rating required"],
    },
  },
  { timestamps: true }
);

export const reviewsAndRatings = mongoose.model('Reviews', reviewsSchema);