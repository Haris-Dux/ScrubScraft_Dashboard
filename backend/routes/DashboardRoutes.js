import express from "express";
import {
  downloadProductsCsvFile,
    getMonthlyOrdersDifference,
    getOrderCountsByMonth,
  getPercentageOfOrderProgress,
  getSalesStatistics,

} from "../controllers/DashboardControler.js";
import { AdminOnly } from "../middleware/Auth.js";

const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard/getPercentageOfOrderProgress",AdminOnly, getPercentageOfOrderProgress);
dashboardRouter.post("/dashboard/getSalesStatistics",AdminOnly, getSalesStatistics);
dashboardRouter.post("/dashboard/getMonthlyOrdersDifference",AdminOnly, getMonthlyOrdersDifference);
dashboardRouter.post("/dashboard/getOrderCountsByMonth",AdminOnly, getOrderCountsByMonth);
dashboardRouter.get("/dashboard/downloadProductsCsvFile", downloadProductsCsvFile);


export default dashboardRouter;
