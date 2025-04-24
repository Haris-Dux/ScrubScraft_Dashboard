import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { buildQueryParams } from "../utils/Common";

// INITIAL STATE
const initialState = {
  products: [],
  singleProduct: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
  message: "",
};

//API URL
const getProductsUrl  = `http://46.202.128.126:8000/products/getProducts`;
const createProductUrl  = "http://46.202.128.126:8000/products/addProduct";
const updateProductUrl  = "http://46.202.128.126:8000/products/updateProduct";
const getsingleProductUrl  = "http://46.202.128.126:8000/products/getProductById";
const deleteProductUrl  = "http://46.202.128.126:8000/products/deleteProduct";

//CREATE ASYNC THUNK
export const createProductAsync = createAsyncThunk(
  "Shop/create",
  async (formdata) => {
    try {
      const response = await axios.post(createProductUrl, formdata);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

// UPDATE ASYNC THUNK
export const updateProductAsync = createAsyncThunk(
  "Shop/update",
  async (formdata) => {
    try {
      const response = await axios.post(updateProductUrl, formdata);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

//GET PRODUCTS
export const getAllProductsAsync = createAsyncThunk(
  "Shop/getProduts",
  async (data) => {
    const query = buildQueryParams({
      name: data.name,
      category: data.filtersData.category,
      color: data.filtersData.color,
      size: data.filtersData.size,
      fabric_type: data.filtersData.fabric_type,
      page:data.page
    });
    try {
      const response = await axios.post(`${getProductsUrl}?${query}`);
      return response.data;
    } catch (error) {

throw new Error(error)    }
  }
);

//GET SINGLEPRODUCT
export const getsingleProductAsync = createAsyncThunk(
  "Shop/getsingleproduct",
  async (id) => {
    try {
      const response = await axios.post(getsingleProductUrl, { id });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

//DELETE PRODUCT
export const deleteProductAsync = createAsyncThunk(
  "Shop/deleteProduct",
  async (id) => {
    try {
      const response = await axios.post(deleteProductUrl, { id });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      const productIdToDelete = action.payload;
      state.products.productData = state.products.productData.filter(
        (product) => product.id !== productIdToDelete
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state, action) => {
        state.createLoading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.createLoading = false;
      })

      .addCase(getAllProductsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })

      .addCase(getsingleProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getsingleProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload;
      })

      .addCase(deleteProductAsync.pending, (state, action) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
      })

      .addCase(updateProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { deleteProduct } = productSlice.actions;
export default productSlice.reducer;
