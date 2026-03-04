import React from "react";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import useScrollToTop from "../hooks/useScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Scroll to top on every route change — fires before paint
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ThemeToggle />
      <main className="flex-1">{children}</main>
    </div>
  );
}
