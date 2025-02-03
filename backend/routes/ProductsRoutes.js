import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/ProductsController.js";
import multer from "multer";
import { AdminOnly } from "../middleware/Auth.js";

const upload = multer({ storage: multer.memoryStorage() });
const productRouter = express.Router();

productRouter.post(
  "/products/addProduct",AdminOnly,
  upload.fields([
    { name: "primary", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post(
  "/products/updateProduct",AdminOnly,
  upload.fields([
    { name: "primary", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);
productRouter.post("/products/deleteProduct",AdminOnly, deleteProduct);
productRouter.post("/products/getProducts",AdminOnly, getProducts);
productRouter.post("/products/getProductById",AdminOnly, getProductById);

export default productRouter;
