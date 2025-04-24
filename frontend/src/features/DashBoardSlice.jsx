
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// INITIAL STATE
const initialState = {
  OrderProgress: null,
  SalesStatistics:null,
  monthlyOrders:null,
  OrdersByMonth:null,
  isLoading: false,
};

//API URL
const getSalesStatisticsUrl  = `https://api.admin.scrubscraft.shop/dashboard/getSalesStatistics`;
const getmonthlyOrdersUrl  = `https://api.admin.scrubscraft.shop/dashboard/getMonthlyOrdersDifference`;
const getPercentageOfOrderProgressUrl  = `https://api.admin.scrubscraft.shop/dashboard/getPercentageOfOrderProgress`;
const getOrderCountsByMonthsUrl  = `https://api.admin.scrubscraft.shop/dashboard/getOrderCountsByMonth`;
const downloadProductsCsvFileUrl  = `https://api.admin.scrubscraft.shop/dashboard/downloadProductsCsvFile`;


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

export const downloadProductsCsvFileAsync = createAsyncThunk(
  "dashboard/DownloadCsv",
  async () => {
    try {
      const response = await axios.get(downloadProductsCsvFileUrl, {
        responseType: "blob", 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      return "File downloaded successfully";
    } catch (error) {
      toast.error(error.response.data.error);
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
