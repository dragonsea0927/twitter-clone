"use client";
import { useRouter } from "next/navigation";

import { Header } from "./header";
import { ArrowLeft } from "lucide-react";

export const TweetHeader = () => {
  const router = useRouter();
  return (
    <Header>
      <ArrowLeft
        onClick={() => router.back()}
        size={20}
        className={"cursor-pointer hover:opacity-70 transition"}
      />

      <span className="text-lg">Post</span>
    </Header>
  );
};
