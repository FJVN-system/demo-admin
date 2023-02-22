import React from "react";
import Header from "../header";

export default function Layout({ children }: any) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
