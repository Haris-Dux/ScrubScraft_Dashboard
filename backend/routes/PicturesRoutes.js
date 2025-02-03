import express from "express";
import {
  createSizePicture,
  deleteSizePicture,
  getAllSizePictures
} from "../controllers/PicturesController.js";
import { AdminOnly } from "../middleware/Auth.js";
import multer from "multer";
const picturesrRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

picturesrRouter.post(
  "/picturesrRouter/createSizePicture",
  AdminOnly,upload.single("image"),
  createSizePicture
);
picturesrRouter.post(
  "/picturesrRouter/getAllSizePictures",
  
  getAllSizePictures
);

picturesrRouter.post(
  "/picturesrRouter/deleteSizePicture",
  AdminOnly,
  deleteSizePicture
);

export default picturesrRouter;
