import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { Forgot } from "./Forgot";
import { Reset } from "./Reset";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? <section>{children}</section> : <Navigate replace to="/" />;
}
