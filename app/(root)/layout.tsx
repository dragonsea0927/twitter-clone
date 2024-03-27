import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import Auth from "@/components/Auth";
import Sidebar from "@/components/sidebar/sidebar";
import { authOptions } from "@/lib/auth-options";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader'
import FollowBar from "@/components/shared/follow-bar";
import { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Twitter clone',
  description: 'Nextjs 14 twitter clone',
}

const Layout = async ({ children }: Props) => {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  return (
    <div className="lg:container h-screen mx-auto lg:max-w-7xl md:max-w-2xl ">
      <div className="flex">
        <Sidebar user={JSON.parse(JSON.stringify(session.currentUser))} />

        <div className="flex flex-1 border-x-[1px] lg:mx-4 ml-1">
          <div className="w-full">
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
            <Toaster />
          </div>
        </div>
        <FollowBar/>
      </div>
    </div>
  );
};

export default Layout;
