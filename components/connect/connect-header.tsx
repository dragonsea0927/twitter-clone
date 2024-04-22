"use client";
import React from "react";
import { Header } from "../header/header";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { EllipsisWrapper } from "../elements/ellipsis-wrapper";
import { useRouter } from "next/navigation";

const ConnectHeader = () => {
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
          <h2 className="text-lg font-bold  ">Connect</h2>
        </div>
        <>
          <h2 className=" py-3 text-lg font-bold ">Suggested for you</h2>
        </>
      </div>
    </Header>
  );
};

export default ConnectHeader;
