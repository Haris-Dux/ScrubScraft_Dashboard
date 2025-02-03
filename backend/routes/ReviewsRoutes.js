import express from "express";
import {
  deleteReview,
  getAllReviews,

} from "../controllers/ReviewsController.js";
const reviewsRouter = express.Router();

reviewsRouter.post("/reviews/deleteReview",deleteReview);
reviewsRouter.post("/reviews/getAllReviews",getAllReviews);

export default reviewsRouter;
