
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// INITIAL STATE
const initialState = {
  OrderProgress: null,
  SalesStatistics:null,
  monthlyOrders:null,
  OrdersByMonth:null,
  isLoading: false,
};

//API URL
const getSalesStatisticsUrl = `/dashboard/getSalesStatistics`;
const getmonthlyOrdersUrl = `/dashboard/getMonthlyOrdersDifference`;
const getPercentageOfOrderProgressUrl = `/dashboard/getPercentageOfOrderProgress`;
const getOrderCountsByMonthsUrl = `/dashboard/getOrderCountsByMonth`;

export const SalesStatisticsAsync = createAsyncThunk(
  "dashboard/SalesStatistics",
  async () => {
    try {
      const response = await axios.post(getSalesStatisticsUrl);
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  }
);

export const monthlyOrdersAsync = createAsyncThunk(
  "dashboard/getmonthlyOrders",
  async () => {
    try {
      const response = await axios.post(getmonthlyOrdersUrl);
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  }
);

export const getOrderProgressAsync = createAsyncThunk(
  "dashboard/OrderProgress",
  async () => {
    try {
      const response = await axios.post(getPercentageOfOrderProgressUrl);
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  }
);

export const getOrderCountsByMonthsAsync = createAsyncThunk(
  "dashboard/getOrderCountsByMonths",
  async () => {
    try {
      const response = await axios.post(getOrderCountsByMonthsUrl);
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

     //salesStatics
      .addCase(SalesStatisticsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(SalesStatisticsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.SalesStatistics = action.payload;
      })

        //signupData
        .addCase(monthlyOrdersAsync.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(monthlyOrdersAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.monthlyOrders = action.payload;
        })

         //orderProgress
         .addCase(getOrderProgressAsync.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(getOrderProgressAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.OrderProgress = action.payload;
        })

           //orderProgress
           .addCase(getOrderCountsByMonthsAsync.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(getOrderCountsByMonthsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.OrdersByMonth = action.payload;
          })
  },
});

export default dashboardSlice.reducer;
