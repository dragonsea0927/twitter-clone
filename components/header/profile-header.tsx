"use client";
import React from "react";
import { Header } from "./header"; 
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EllipsisWrapper } from "../elements/ellipsis-wrapper";

const ProfileHeader = ({
  heading,
  stats,
}: {
  heading: string | undefined;
  stats: string | undefined;
}) => {
  const router = useRouter();

  return (
    <Header className="gap-5 w-full">
      <div className="flex flex-row items-center gap-4">
        <ArrowLeft
          onClick={() => router.back()}
          size={20}
          className={"cursor-pointer hover:opacity-70 transition"}
        />
      </div>
      <div>
        <h2 className=" font-bold text-secondary-100">
          {heading ?? "Profile"}
        </h2>
        <EllipsisWrapper>
          <span className="text-xs font-normal text-neutral-700 dark:text-neutral-500">
            {stats}
          </span>
        </EllipsisWrapper>
      </div>
    </Header>
  );
};

export default ProfileHeader;
