"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react"; 
import Sidebar from "../sidebar/sidebar";
import { Toaster } from "../ui/toaster";
import NextTopLoader from "nextjs-toploader"; 
import Aside from "../aside/aside";
import LoadingScreen from "../elements/loading-screen/loading-screen";
import Auth from "../auth";

interface Props {
  children: React.ReactNode;
}

const Home = ({ children }: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingScreen/>;
  }

  if (!session) {
    return (
      <div className="container h-screen mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  }

  return (
    <>
      {session && (
        <div className="layout ">
          <Sidebar />

          <main
            aria-label="Home timeline"
            id="home-timeline"
            className="border-x"
          >
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
          </main>
          <Aside />
          {/* <FollowBar /> */}
        </div>
      )}
    </>
  );
};

export default Home;
