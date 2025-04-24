import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  picturesData: [],
  isLoading: false,
  createLoading: false,
  deleteLoading:false
};

//API URL
const getAllSizePicturesUrl  = `https://api.admin.scrubscraft.shop/picturesrRouter/getAllSizePictures`;
const createSizePicturesUrl  = `https://api.admin.scrubscraft.shop/picturesrRouter/createSizePicture`;
const deleteSizePicturesUrl  = `https://api.admin.scrubscraft.shop/picturesrRouter/deleteSizePicture`;

export const getAllPicturesAsync = createAsyncThunk(
  "pictures/getallPictures",
  async () => {
    try {
      const response = await axios.post(getAllSizePicturesUrl);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const createSizePicturesAsync = createAsyncThunk(
  "pictures/createSizePicture",
  async (data) => {
    try {
      const response = await axios.post(createSizePicturesUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      throw new Error(error);
    }
  }
);

export const deleteSizePicturesAsync = createAsyncThunk(
  "pictures/deldtePictures",
  async (data) => {
    try {
      const response = await axios.post(deleteSizePicturesUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      throw new Error(error);
    }
  }
);

const picturesSlice = createSlice({
  name: "picturesSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //GET ALL PICTURES
      .addCase(getAllPicturesAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPicturesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.picturesData = action.payload;
      })
      .addCase(getAllPicturesAsync.rejected, (state, action) => {
        state.isLoading = false;
      })

      //CREATE PICTURES
      .addCase(createSizePicturesAsync.pending, (state, action) => {
        state.createLoading = true;
      })
      .addCase(createSizePicturesAsync.fulfilled, (state, action) => {
        state.createLoading = false;
        state.picturesData = action.payload.data;
      })
      .addCase(createSizePicturesAsync.rejected, (state, action) => {
        state.createLoading = false;
      })

      //DELETE PICTURES
      .addCase(deleteSizePicturesAsync.pending, (state, action) => {
        state.deleteLoading = true;
      })
      .addCase(deleteSizePicturesAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
      })
      .addCase(deleteSizePicturesAsync.rejected, (state, action) => {
        state.deleteLoading = false;
      });
  },
});

export default picturesSlice.reducer;
