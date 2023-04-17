import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AdminRegisterScreen from "./screens/userManagement/registerUser/AdminRegisterScreen";
import CustomerRegisterScreen from "./screens/userManagement/registerUser/CustomerRegisterScreen";
import CustomerLandingPage from "./screens/static/landingPages/CustomerLandingPage";
import VendorLandingPage from "./screens/static/landingPages/VendorLandingPage";
import AdminLandingPage from "./screens/static/landingPages/AdminLandingPage";
import HomeScreen from "./screens/static/home/HomeScreen";
import AdminLogin from "./screens/userManagement/login/AdminLogin";
import CustomerLogin from "./screens/userManagement/login/CustomerLogin";
import VendorLogin from "./screens/userManagement/login/VendorLogin";
import VendorRegisterScreen from "./screens/userManagement/registerUser/VendorRegisterScreen";
import AdminViewScreen from "./screens/userManagement/viewUser/AdminViewScreen";
import CustomerViewScreen from "./screens/userManagement/viewUser/CustomerViewScreen";
import VendorViewScreen from "./screens/userManagement/viewUser/VendorViewScreen";
import AdminEditScreen from "./screens/userManagement/editUser/AdminEditScreen";
import CustomerEditScreen from "./screens/userManagement/editUser/CustomerEditScreen";
import VendorEditScreen from "./screens/userManagement/editUser/VendorEditScreen";
import CustomerListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/CustomerListForAdminScreen";
import VendorListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/VendorListForAdminScreen";
import CustomerEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/CustomerEditByAdminScreen";
import VendorEditByAdminScreen from "./screens/userManagement/adminUserManagement/adminUserEditScreens/VendorEditByAdminScreen";
import ProductsListForVendorScreen from "./screens/productManagement/vendorProductManagement/productsListForVendor/ProductsListForVendorScreen";
import ProductsListForAdminScreen from "./screens/productManagement/adminProductManagement/productsListForAdmin/ProductsListForAdminScreen";
import AddProductByVendorScreen from "./screens/productManagement/vendorProductManagement/addProduct/AddProductByVendorScreen";
import SingleProductForVendorScreen from "./screens/productManagement/vendorProductManagement/getSingleProductForVendor/SingleProductForVendorScreen";
import SingleProductForAdminScreen from "./screens/productManagement/adminProductManagement/getSingleProductForAdmin/SingleProductForAdminScreen";

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Route path="/admin-login" component={AdminLogin} />
        <Route path="/customer-login" component={CustomerLogin} />
        <Route path="/vendor-login" component={VendorLogin} />
        <Route path="/admin-register" component={AdminRegisterScreen} exact />
        <Route
          path="/customer-register"
          component={CustomerRegisterScreen}
          exact
        />
        <Route path="/vendor-register" component={VendorRegisterScreen} exact />
        <Route path="/admin-view" component={AdminViewScreen} exact />
        <Route path="/customer-view" component={CustomerViewScreen} exact />
        <Route path="/vendor-view" component={VendorViewScreen} exact />
        <Route path="/admin-edit" component={AdminEditScreen} exact />
        <Route path="/customer-edit" component={CustomerEditScreen} exact />
        <Route path="/vendor-edit" component={VendorEditScreen} exact />
        <Route
          path="/admin-customers"
          component={CustomerListForAdminScreen}
          exact
        />
        <Route
          path="/admin-vendors"
          component={VendorListForAdminScreen}
          exact
        />
        <Route
          path="/admin-customer-edit/:id"
          component={CustomerEditByAdminScreen}
          exact
        />
        <Route
          path="/admin-vendor-edit/:id"
          component={VendorEditByAdminScreen}
          exact
        />
        <Route path="/admin" component={AdminLandingPage} exact />
        <Route path="/customer" component={CustomerLandingPage} exact />
        <Route path="/vendor" component={VendorLandingPage} exact />
        <Route
          path="/vendor-products"
          component={ProductsListForVendorScreen}
          exact
        />
        <Route
          path="/admin-products"
          component={ProductsListForAdminScreen}
          exact
        />
        <Route
          path="/vendor-product-add"
          component={AddProductByVendorScreen}
          exact
        />
        <Route
          path="/vendor-product-edit/:id"
          component={SingleProductForVendorScreen}
          exact
        />
        <Route
          path="/admin-product-edit/:id"
          component={SingleProductForAdminScreen}
          exact
        />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
