import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  tabData: [],
  loading: false,
  createLoading: false,
  deleteLoading: false,
};

//API URL
const createCategoryUrl = "/productDetails/createCategory";
const getAllCategoriesUrl =
  "/productDetails/getAllCategories";
const updateCategoryUrl = "/productDetails/updateCategory";
const deleteCategoryUrl = "/productDetails/deleteCategory";

const createColorUrl = "/productDetails/createColor";
const getAllColorsUrl = "/productDetails/getAllColors";
const updateColorUrl = "/productDetails/updateColor";
const deleteColorUrl = "/productDetails/deleteColor";

const createFabricUrl = "/productDetails/createFabric";
const getAllFabricsUrl = "/productDetails/getAllFabrics";
const updateFabricUrl = "/productDetails/updateFabric";
const deleteFabricUrl = "/productDetails/deleteFabric";

// CATEGORIES

export const createCategoryAsync = createAsyncThunk(
  "categories/createCategory",
  async (data) => {
    try {
      const response = await axios.post(createCategoryUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      throw error;
    }
  }
);

export const getAllCategoriesAsync = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await axios.get(getAllCategoriesUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "categories/updateCategory",
  async (data) => {
    try {
      const response = await axios.put(updateCategoryUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      throw error;
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "categories/deleteCategory",
  async (data) => {
    try {
      const response = await axios.post(deleteCategoryUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

//FABRICS

export const createFabricAsync = createAsyncThunk(
  "fabrics/createFabric",
  async (data) => {
    try {
      const response = await axios.post(createFabricUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const getAllFabricsAsync = createAsyncThunk(
  "fabrics/getAllFabrics",
  async () => {
    try {
      const response = await axios.get(getAllFabricsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateFabricAsync = createAsyncThunk(
  "fabrics/updateFabric",
  async (data) => {
    try {
      const response = await axios.put(updateFabricUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const deleteFabricAsync = createAsyncThunk(
  "fabrics/deleteFabric",
  async (data) => {
    try {
      const response = await axios.post(deleteFabricUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

// COLORS

export const createColorAsync = createAsyncThunk(
  "colors/createColor",
  async (data) => {
    try {
      const response = await axios.post(createColorUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const getAllColorsAsync = createAsyncThunk(
  "colors/getAllColors",
  async () => {
    try {
      const response = await axios.get(getAllColorsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateColorAsync = createAsyncThunk(
  "colors/updateColor",
  async (data) => {
    try {
      const response = await axios.put(updateColorUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

export const deleteColorAsync = createAsyncThunk(
  "colors/deleteColor",
  async (data) => {
    try {
      const response = await axios.post(deleteColorUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error);
      throw error;
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetailSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Create Category
      .addCase(createCategoryAsync.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tabData.push(action.payload.data);
      })
      .addCase(createCategoryAsync.rejected, (state) => {
        state.createLoading = false;
      })

      // Get All Categories
      .addCase(getAllCategoriesAsync.pending, (state) => {
        state.tabData = [];
        state.loading = true;
      })
      .addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tabData = action.payload;
      })
      .addCase(getAllCategoriesAsync.rejected, (state) => {
        state.loading = false;
      })

      // Update Category
      .addCase(updateCategoryAsync.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tabData = state.tabData.map((category) =>
          category.id === action.payload.data.id ? action.payload.data : category
        );
      })
      .addCase(updateCategoryAsync.rejected, (state) => {
        state.createLoading = false;
      })

      // Delete Category
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.tabData = state.tabData.filter(
          (category) => category.id !== action.payload.data.id
        );
      })
      .addCase(deleteCategoryAsync.rejected, (state) => {
        state.deleteLoading = false;
      })

      //FABRICS

      // Create Fabric
      .addCase(createFabricAsync.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createFabricAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tabData.push(action.payload.data);
      })
      .addCase(createFabricAsync.rejected, (state) => {
        state.createLoading = false;
      })

      // Get All Fabrics
      .addCase(getAllFabricsAsync.pending, (state) => {
        state.tabData = [];
        state.loading = true;
      })
      .addCase(getAllFabricsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tabData = action.payload;
      })
      .addCase(getAllFabricsAsync.rejected, (state) => {
        state.loading = false;
      })

      // Update Fabric
      .addCase(updateFabricAsync.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(updateFabricAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tabData = state.tabData.map((fabric) =>
          fabric.id === action.payload.data.id ? action.payload.data : fabric
        );
      })
      .addCase(updateFabricAsync.rejected, (state) => {
        state.createLoading = false;
      })

      // Delete Fabric
      .addCase(deleteFabricAsync.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteFabricAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.tabData = state.tabData.filter(
          (fabric) => fabric.id !== action.payload.data.id
        );
      })
      .addCase(deleteFabricAsync.rejected, (state) => {
        state.deleteLoading = false;
      })

      // COLORS

      // Create Color
      .addCase(createColorAsync.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createColorAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tabData.push(action.payload.data);
      })
      .addCase(createColorAsync.rejected, (state) => {
        state.createLoading = false;
      })

      // Get All Colors
      .addCase(getAllColorsAsync.pending, (state) => {
        state.tabData = [];
        state.loading = true;
      })
      .addCase(getAllColorsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tabData = action.payload;
      })
      .addCase(getAllColorsAsync.rejected, (state) => {
        state.loading = false;
      })

      // Update Color
      .addCase(updateColorAsync.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(updateColorAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.tabData = state.tabData.map((color) =>
          color.id === action.payload.data.id ? action.payload.data : color
        );
      })
      .addCase(updateColorAsync.rejected, (state) => {
        state.createLoading = false;
      })

      // Delete Color
      .addCase(deleteColorAsync.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteColorAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.tabData = state.tabData.filter(
          (color) => color.id !== action.payload.data.id
        );
      })
      .addCase(deleteColorAsync.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export default productDetailSlice.reducer;
