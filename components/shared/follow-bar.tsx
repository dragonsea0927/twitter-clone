"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IUser } from "@/types";
import useUsers from "@/hooks/useUsers";
import UserItem from "./user-item";
import { Loader2 } from "lucide-react";

const FollowBar = () => {
  const { isLoading, data: users = [] } = useUsers(5);

  return (
    <div className="py-4 hidden overflow-hidden lg:block w-[275px]">
      <div className="dark:bg-zinc-800/50 bg-zinc-500/5 rounded-xl ">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-xl font-semibold">Who to follow</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            {users.map((user: IUser) => (
              <UserItem user={user} key={user._id} />
            ))}
          </div>
        )}

        <Link href="/explore" className="text-[15px] flex py-3 text-sky-500 rounded-b-xl hover:bg-zinc-500/10 justify-center w-full items-center">
           Show more
        </Link>
      </div>
      <></>
    </div>
  );
};

export default FollowBar;
