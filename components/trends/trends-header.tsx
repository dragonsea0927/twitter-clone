'use client'
import React from "react";
import { Header } from "../header/header";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TrendsHeader = () => {
  const router = useRouter();
  return (
    <Header>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <ArrowLeft
            onClick={() => router.back()}
            size={20}
            className={"cursor-pointer hover:opacity-70 transition"}
          />
          <h2 className="text-lg font-bold  ">Trends</h2>
        </div>
        <div></div>
      </div>
    </Header>
  );
};

export default TrendsHeader;
