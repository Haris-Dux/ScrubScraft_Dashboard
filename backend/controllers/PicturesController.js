import { sizePicturesModel } from "../models/PicturesModel.js";
import {
  uploadImageToFirebase,
  deleteImageFromFirebase,
} from "../utils/Firebase.js";
import { setMongoose } from "../utils/Mongoose.js";

export const createSizePicture = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      throw new Error("Image is required");
    }


    const imageResult = await uploadImageToFirebase(image, "Scrub Images");

    await sizePicturesModel.create({
      
      image: {
        downloadURL: imageResult.downloadURL,
        name: imageResult.name,
        type: imageResult.type,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "Size picture added successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllSizePictures = async (req, res) => {
  try {
    const sizePictures = await sizePicturesModel.find().sort({ createdAt: -1 });
    setMongoose();
    return res.status(200).json(sizePictures);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSizePicture = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("Size picture id not found");
    }

    const sizePicture = await sizePicturesModel.findById(id)
    if (!sizePicture) {
      throw new Error("Size picture not found");
    }

    if (sizePicture.image.downloadURL) {
      await deleteImageFromFirebase(sizePicture.image.downloadURL);
    }

    await sizePicturesModel.findByIdAndDelete(sizePicture._id);

    res.status(200).json({ success: true , message: "Size picture deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
