import express from "express";
import userRouter from "./UserRoutes.js";
import productRouter from "./ProductsRoutes.js";
import reviewsRouter from "./ReviewsRoutes.js";
import orderRouter from "./OrdersRoutes.js";
import contactRouter from "./ContactRoutes.js";
import dashboardRouter from "./DashboardRoutes.js";
import productDetailsRouter from "./ProductDetailsRoutes.js";
import picturesrRouter from "./PicturesRoutes.js";


const router = express.Router();

router.use(userRouter);
router.use(productRouter);
router.use(reviewsRouter);
router.use(orderRouter);
router.use(contactRouter);
router.use(dashboardRouter);
router.use(productDetailsRouter);
router.use(picturesrRouter);


export default router;