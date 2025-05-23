import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// INITIAL STATE
const initialState = {
  orders: [],
  singleOrder:[],
  isLoading: false,
};

//API URL
const getAllOrdersUrl  = `https://api.admin.scrubscraft.shop/orders/getAllOrders`;
const updateOrdersUrl  = "https://api.admin.scrubscraft.shop/orders/updateOrder";
const getOrderByIdUrl  = "https://api.admin.scrubscraft.shop/orders/getOrderById";

export const getAllOrdersAsync = createAsyncThunk(
  "Orders/getallOrders",
  async (data) => {
    const searchQuery =
    data?.search !== undefined && data?.search !== null
      ? `&search=${data?.search}`
      : "";
    try {
      const response = await axios.post(`${getAllOrdersUrl}?status=${data.status}&page=${data.page}${searchQuery}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

export const updateOrdersAsync = createAsyncThunk(
  "Orders/updateCoupon",
  async (data) => {
    try {
      const response = await axios.post(updateOrdersUrl, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

export const getOrderByIdsync = createAsyncThunk(
  "Order/getOrderByid",
  async (id) => {  
    try {
      const response = await axios.get(`${getOrderByIdUrl}/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      
      .addCase(getAllOrdersAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })

      .addCase(getOrderByIdsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderByIdsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrder = action.payload;
      });
  },
});

export default orderSlice.reducer;
