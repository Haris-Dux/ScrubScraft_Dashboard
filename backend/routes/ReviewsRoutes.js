import express from "express";
import {
  deleteReview,
  getAllReviews,

} from "../controllers/ReviewsController.js";
import { AdminOnly } from "../middleware/Auth.js";
const reviewsRouter = express.Router();

reviewsRouter.post("/reviews/deleteReview",AdminOnly,  deleteReview);
reviewsRouter.post("/reviews/getAllReviews",AdminOnly,  getAllReviews);

export default reviewsRouter;
