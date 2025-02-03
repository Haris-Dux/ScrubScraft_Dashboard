import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/ProductsController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const productRouter = express.Router();

productRouter.post(
  "/products/addProduct",
  upload.fields([
    { name: "primary", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post(
  "/products/updateProduct",
  upload.fields([
    { name: "primary", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);
productRouter.post("/products/deleteProduct", deleteProduct);
productRouter.post("/products/getProducts", getProducts);
productRouter.post("/products/getProductById", getProductById);

export default productRouter;
