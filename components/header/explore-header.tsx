"use client";
import React from "react";
import { Header } from "./header";
import Search from "../search/search";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const ExploreHeader = () => {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get("query") || "");
  const router = useRouter();
  
  return (
    <Header>
      {query && (
        <ArrowLeft
          onClick={() => router.back()}
          size={20}
          className={"cursor-pointer hover:opacity-70 transition"}
        />
      )}

      <div className="flex-1">
        <Search />
      </div>
    </Header>
  );
};

export default ExploreHeader;
