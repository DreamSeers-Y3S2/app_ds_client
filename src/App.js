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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/admin-register" element={<AdminRegisterScreen />} />
        <Route path="/customer-register" element={<CustomerRegisterScreen />} />
        <Route path="/vendor-register" element={<VendorRegisterScreen />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/customer" element={<CustomerLandingPage />} />
        <Route path="/vendor" element={<VendorLandingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
