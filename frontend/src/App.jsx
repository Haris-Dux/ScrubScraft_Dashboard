import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminPanel from "./admin/AdminPanel";
import AllProducts from "./admin/AllProducts";
import CreateProduct from "./admin/CreateProduct";
import UpdateProduct from "./admin/UpdateProduct";
import "./App.css";
import "loaders.css/loaders.min.css";
import "./Loader.scss";
import Dashboard from "./admin/Dashboard";
import ViewOrders from "./admin/ViewOrders";
import OrderDetailPage from "./admin/OrderDetailPage";
import SendOtp from "./auth/SendOtp";
import VerifyOtp from "./auth/VerifyOtp";
import Reviews from "./admin/Reviews";
import ResetPassword from "./auth/ResetPassword";
import ContactQueries from "./admin/ContactQueries";
import ProductDetails from "./admin/ProductDetails(S,F,C)";
import Pictures from "./admin/Pictures";
import {UserProtected } from "./RouteGuards/ProtectedRouting";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* AUTH ROUTE */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sendOtp" element={<SendOtp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/reset" element={<ResetPassword />} />

          {/* ADMIN ROUTE */}
          <Route path="/admin" element={<UserProtected><AdminPanel /></UserProtected>}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/all_product" element={<AllProducts />} />
            <Route path="create_product" element={<CreateProduct />} />
            <Route path="product_details" element={<ProductDetails />} />
            <Route path="pictures" element={<Pictures />} />
            <Route path="update_product/:id" element={<UpdateProduct />} />
            <Route path="view_orders" element={<ViewOrders />} />
            <Route path="orderDetail/:id" element={<OrderDetailPage />} />
           
            <Route path="reviews" element={<Reviews />} />
            <Route path="contact_queries" element={<ContactQueries />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
