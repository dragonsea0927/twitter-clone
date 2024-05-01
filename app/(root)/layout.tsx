import React from "react";
import { Metadata } from "next";
import Home from "@/components/home/home";
 
export const metadata: Metadata = {
  generator:'Next.js',
  applicationName:'Twitter clone',
  creator: 'Dignesh Hirapara',
  title: {
    template: '%s / X',
    default: 'X',  
  },
}

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return  <Home>{children}</Home> ;
};

export default Layout;


