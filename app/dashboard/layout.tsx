"use client";

import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardNav from "../components/DashboardNav";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <section className="max-w-[1200px] mx-auto w-full mt-2 p-2  ">
        <DashboardNav />
        {children}
      </section>
    </ProtectedRoute>
  );
}
