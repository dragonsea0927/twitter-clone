import React from "react";
import { Metadata } from "next";
import Home from "@/components/home/home";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export const metadata: Metadata = {
  title: "Twitter clone",
  description: "Nextjs 14 twitter clone",
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return  <Home>{children}</Home> ;
};

export default Layout;
