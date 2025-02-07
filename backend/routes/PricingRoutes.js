import express from "express";

import { AdminOnly } from "../middleware/Auth.js";
import { getPricing, updatePricing } from "../controllers/PricingController.js";
const pricingRouter = express.Router();

pricingRouter.get("/pricing/getPricing",  getPricing);
pricingRouter.post("/pricing/updatePricing",AdminOnly,  updatePricing);

export default  pricingRouter;


