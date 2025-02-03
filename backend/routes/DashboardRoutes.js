import express from "express";
import {
    getMonthlyOrdersDifference,
    getOrderCountsByMonth,
  getPercentageOfOrderProgress,
  getSalesStatistics,

} from "../controllers/DashboardControler.js";

const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard/getPercentageOfOrderProgress", getPercentageOfOrderProgress);
dashboardRouter.post("/dashboard/getSalesStatistics", getSalesStatistics);
dashboardRouter.post("/dashboard/getMonthlyOrdersDifference", getMonthlyOrdersDifference);
dashboardRouter.post("/dashboard/getOrderCountsByMonth", getOrderCountsByMonth);

export default dashboardRouter;
