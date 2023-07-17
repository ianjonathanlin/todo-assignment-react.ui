"use client";

import { UserProvider } from "./src/contexts/UserContext";
import Header from "./src/header";
import Main from "./src/main";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <UserProvider>
      <Header />
      <Main />
      <Toaster />
    </UserProvider>
  );
}
