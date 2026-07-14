import React from "react";
import { Footer } from "./Footer/Footer";

export const PageLayout = ({ children }) => (
  <div className="bg-[#0B0B0B] min-h-screen text-[#F5F5F5] pt-[100px] pb-20">
    <div className="site-container">{children}</div>
    <Footer />
  </div>
);
