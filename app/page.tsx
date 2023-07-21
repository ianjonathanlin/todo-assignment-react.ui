"use client";

import { AuthProvider } from "./src/contexts/AuthContext";
import Header from "./src/header";
import Main from "./src/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <Main />
      <ToastContainer />
    </AuthProvider>
  );
}
