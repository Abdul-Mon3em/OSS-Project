import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import Loginpage from "./pages/login/Loginpage";
import RegisterPage from "./pages/Register/RegisterPage";
import AuthRoute from "./component/AuthRoute";
import CkeckoutPage from "./pages/Checkout/CkeckoutPage";
import PaymendPage from "./pages/Payment/PaymendPage";
import OrderTrackPage from "./pages/Track/OrderTrackPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrdersPage from "./pages/Orders/OrdersPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRouteExport from "./component/AdminRoute";
import FoodsAdminPage from "./pages/FoodsAdmin/FoodsAdminPage";
import FoodEditPage from "./pages/FoodEdit/FoodEditPage";

import CategoriesAdminPage from "./pages/CategoriesAdmin/CategoriesAdminPage";
import CategoryEditPage from "./pages/CategoriesEdit/CategoryEditPage";
import Thumbnails from "./component/Thumbnails";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:searchTerm" element={<Homepage />} />
      <Route path="/allproduct" element={<Thumbnails />} />
      <Route path="/tags/:Tag" element={<Thumbnails />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CkeckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymendPage />
          </AuthRoute>
        }
      />
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/foods/:searchTerm?"
        element={
          <AdminRouteExport>
            <FoodsAdminPage />
          </AdminRouteExport>
        }
      />
      <Route
        path="/admin/categories/:searchTerm?"
        element={
          <AdminRouteExport>
            <CategoriesAdminPage />
          </AdminRouteExport>
        }
      />
      <Route
        path="/admin/addfood"
        element={
          <AdminRouteExport>
            <FoodEditPage />
          </AdminRouteExport>
        }
      />
      <Route
        path="/admin/editfood/:foodId"
        element={
          <AdminRouteExport>
            <FoodEditPage />
          </AdminRouteExport>
        }
      />
      <Route
        path="/admin/addcategory"
        element={
          <AdminRouteExport>
            <CategoryEditPage />
          </AdminRouteExport>
        }
      />
      <Route
        path="/admin/editcategory/:foodId"
        element={
          <AdminRouteExport>
            <CategoryEditPage />
          </AdminRouteExport>
        }
      />
    </Routes>
  );
}

export default AppRoute;
