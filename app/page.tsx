"use client";

import { AuthProvider } from "./src/contexts/AuthContext";
import Header from "./src/header";
import Main from "./src/main";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <Main />
      <Toaster />
    </AuthProvider>
  );
}
