import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  reviews: [],
  isLoading: false,
};

//API URL
const getAllReviewsUrl = `/reviews/getAllReviews`;
const deleteReviewsUrl = `/reviews/deleteReview`;

export const getAllReviewsAsync = createAsyncThunk(
  "reviews/getallreviews",
  async (page) => {
    try {
      const response = await axios.post(`${getAllReviewsUrl}?page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteReviewsAsync = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    try {
      const response = await axios.post(deleteReviewsUrl, id);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getAllReviewsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllReviewsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      });
  },
});

export default reviewSlice.reducer;
