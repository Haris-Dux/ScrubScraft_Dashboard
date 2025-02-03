import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createColor,
  getAllColors,
  getColorById,
  updateColor,
  deleteColor,
  createFabric,
  getAllFabrics,
  getFabricById,
  updateFabric,
  deleteFabric,
} from "../controllers/ProductDetailsController.js";
import { AdminOnly } from "../middleware/Auth.js";

const productDetailsRouter = express.Router();

// Category Routes
productDetailsRouter.post("/productDetails/createCategory",AdminOnly, createCategory);
productDetailsRouter.get("/productDetails/getAllCategories",getAllCategories);
productDetailsRouter.get("/productDetails/getCategoryById", AdminOnly,getCategoryById);
productDetailsRouter.put("/productDetails/updateCategory", updateCategory);
productDetailsRouter.post("/productDetails/deleteCategory",AdminOnly, deleteCategory);

// Color Routes
productDetailsRouter.post("/productDetails/createColor", AdminOnly,createColor);
productDetailsRouter.get("/productDetails/getAllColors",getAllColors);
productDetailsRouter.get("/productDetails/getColorById",AdminOnly, getColorById);
productDetailsRouter.put("/productDetails/updateColor", AdminOnly,updateColor);
productDetailsRouter.post("/productDetails/deleteColor", AdminOnly,deleteColor);

// Fabric Routes
productDetailsRouter.post("/productDetails/createFabric",AdminOnly, createFabric);
productDetailsRouter.get("/productDetails/getAllFabrics",getAllFabrics);
productDetailsRouter.get("/productDetails/getFabricById",AdminOnly, getFabricById);
productDetailsRouter.put("/productDetails/updateFabric",AdminOnly, updateFabric);
productDetailsRouter.post("/productDetails/deleteFabric",AdminOnly, deleteFabric);

export default productDetailsRouter;
