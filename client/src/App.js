import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CarForm from "./pages/CarForm";
import ListingsPage from "./pages/Listing";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Password from "./pages/Password";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-car" element={<CarForm />} />
      <Route path="/listing" element={<ListingsPage />} />
      <Route path="/password" element={<Password />} />
    </Routes>
  );
};

export default App;
