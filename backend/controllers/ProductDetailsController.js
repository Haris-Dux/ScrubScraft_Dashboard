import {
  CategoriesModel,
  ColorsModel,
  fabricsModel,
} from "../models/ProductDetailsModel.js";
import { setMongoose } from "../utils/Mongoose.js";

//CATEGORIES

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error("Category name is required");

    const existingCategory = await CategoriesModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingCategory) throw new Error("Category already exists");

    const data = await CategoriesModel.create({ name });

    setMongoose();

    return res
      .status(201)
      .json({ success: true, message: "Category created successfully", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.find().sort({ createdAt: -1 });
    setMongoose();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await CategoriesModel.findById(id);
    if (!category) throw new Error("Category not found");

    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, id } = req.body;
    if (!name || !id) throw new Error("Category details are required");

    const existingCategory = await CategoriesModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingCategory) throw new Error("Category already exists");

    const updatedCategory = await CategoriesModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) throw new Error("Category not found");

    return res
      .status(200)
      .json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Category Id not Found");
    const deletedCategory = await CategoriesModel.findByIdAndDelete(id);

    if (!deletedCategory) throw new Error("Category not found");
    setMongoose();
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//COLORS

export const createColor = async (req, res) => {
  try {
    const { label, value } = req.body;
    if (!label || !value) throw new Error("Both label and value are required");

    const existingcolor = await ColorsModel.findOne({
      label: { $regex: new RegExp(`^${label}$`, "i") },
    });
    if (existingcolor) throw new Error("Color already exists");

    const data = await ColorsModel.create({ label, value });
    setMongoose();
    return res
      .status(201)
      .json({ success: true, message: "Color created successfully", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllColors = async (req, res) => {
  try {
    const colors = await ColorsModel.find().sort({ createdAt: -1 });
    setMongoose();
    return res.status(200).json(colors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getColorById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Color ID is required");
    const color = await ColorsModel.findById(id);
    if (!color) throw new Error("Color not found");

    return res.status(200).json(color);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const updateColor = async (req, res) => {
  try {
    const { id, label, value } = req.body;
    if (!label || !value || !id)
      throw new Error("label,value and id are required");

    const existingcolor = await ColorsModel.findOne({
      label: { $regex: new RegExp(`^${label}$`, "i") },
      value: { $regex: new RegExp(`^${value}$`, "i") },
    });
    if (existingcolor) throw new Error("Color already exists");

    const updatedColor = await ColorsModel.findById(id);
    if (!updatedColor) throw new Error("Color not found");

    if (label) {
      updatedColor.label = label;
    }
    if (value) {
      updatedColor.value = value;
    }
    const data = await updatedColor.save();
setMongoose();
    return res
      .status(200)
      .json({ success: true, message: "Color updated successfully", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteColor = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Color ID is required");
    const deletedColor = await ColorsModel.findByIdAndDelete(id);
    if (!deletedColor) throw new Error("Color not found");
    return res
      .status(200)
      .json({
        success: true,
        message: "Color deleted successfully",
        data: deletedColor,
      });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//FABRICS

export const createFabric = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error("Fabric name is required");

    const existingFabric = await fabricsModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingFabric) throw new Error("Fabric already exists");

    const data = await fabricsModel.create({ name });

    return res
      .status(201)
      .json({ success: true, message: "Fabric created successfully", data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAllFabrics = async (req, res) => {
  try {
    const fabrics = await fabricsModel.find().sort({ createdAt: -1 });
    setMongoose();
    res.status(200).json(fabrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFabricById = async (req, res) => {
  try {
    const { id } = req.body;
    const fabric = await fabricsModel.findById(id);
    if (!fabric) throw new Error("Fabric not found");
    setMongoose();
    return res.status(200).json(fabric);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const updateFabric = async (req, res) => {
  try {
    const { name, id } = req.body;
    if (!name || !id) throw new Error("Fabric name and id is required");

    const existingFabric = await fabricsModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existingFabric) throw new Error("Fabric already exists");

    const updatedFabric = await fabricsModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedFabric) throw new Error("Fabric not found");

    return res
      .status(200)
      .json({ success: true, message: "Fabric updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteFabric = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Fabric ID is required");
    const deletedFabric = await fabricsModel.findByIdAndDelete(id);

    if (!deletedFabric) throw new Error("Fabric not found");

    return res
      .status(200)
      .json({
        success: true,
        message: "Fabric deleted successfully",
        data: deletedFabric,
      });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
