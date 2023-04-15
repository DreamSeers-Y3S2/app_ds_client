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
import VendorRegisterScreen from "./screens/userManagement/registerUser/VendorRegisterScreen";
import AdminViewScreen from "./screens/userManagement/viewUser/AdminViewScreen";
import CustomerViewScreen from "./screens/userManagement/viewUser/CustomerViewScreen";
import VendorViewScreen from "./screens/userManagement/viewUser/VendorViewScreen";
import AdminEditScreen from "./screens/userManagement/editUser/AdminEditScreen";
import CustomerEditScreen from "./screens/userManagement/editUser/CustomerEditScreen";
import VendorEditScreen from "./screens/userManagement/editUser/VendorEditScreen";
import CustomerListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/CustomerListScreen";
import VendorListForAdminScreen from "./screens/userManagement/adminUserManagement/adminLists/VendorListScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/admin-register" element={<AdminRegisterScreen />} />
        <Route path="/customer-register" element={<CustomerRegisterScreen />} />
        <Route path="/vendor-register" element={<VendorRegisterScreen />} />
        <Route path="/admin-view" element={<AdminViewScreen />} />
        <Route path="/customer-view" element={<CustomerViewScreen />} />
        <Route path="/vendor-view" element={<VendorViewScreen />} />
        <Route path="/admin-edit" element={<AdminEditScreen />} />
        <Route path="/customer-edit" element={<CustomerEditScreen />} />
        <Route path="/vendor-edit" element={<VendorEditScreen />} />
        <Route path="/admin-customers" element={<CustomerListForAdminScreen />} />
        <Route path="/admin-vendors" element={<VendorListForAdminScreen />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/customer" element={<CustomerLandingPage />} />
        <Route path="/vendor" element={<VendorLandingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
