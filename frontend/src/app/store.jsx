import { configureStore } from "@reduxjs/toolkit";
import authSlice, { userSessionAsync } from "../features/authSlice";
import productSlice from "../features/productSlice";
import orderSlice from "../features/orderSlice";
import reviewSlice from "../features/reviewSlice";
import contactSlice from "../features/contactSlice";
import DashBoardSlice from "../features/DashBoardSlice";
import productDetailSlice from "../features/ProductDetailsSlice(S,F,C)";
import picturesSlice from "../features/Pictures";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    ProductDetails: productDetailSlice,
    pictures: picturesSlice,
    order: orderSlice,
    review: reviewSlice,
    contact: contactSlice,
    dashboard: DashBoardSlice,
  },
});

store.dispatch(userSessionAsync());

