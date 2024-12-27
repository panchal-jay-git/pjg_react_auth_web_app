import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/Homepage";
import { Container, CssBaseline } from "@mui/material";

const App = () => {
  // const isAuthenticated = !!localStorage.getItem("token");
  const isAuthenticated = true

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
      <Routes>
        {/* Default Route: Bypass authentication check temporarily */}
        <Route path="/" element={<HomePage />} />
        
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      </Container>
    </>
  );
};

export default App;
