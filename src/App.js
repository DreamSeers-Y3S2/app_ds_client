
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import AdminRegister from "./screens/userManagement/registerUser/AdminRegister";


const App = () => {
	return (
		<BrowserRouter>
      <Routes> 
        <Route path="/admin-register" element={<AdminRegister />} />
      </Routes>
		</BrowserRouter>
	);
};

export default App;
