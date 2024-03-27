"use client";
import { Loader2, LogOut, MoreHorizontal } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import useUser from "@/hooks/useUser";

interface Props {
  user: IUser;
}
const SidebarAccount = ({ user }: Props) => {
  const { data } = useUser({ userId: user?._id });

  return (
    <>
      <div className="lg:hidden block">
        <div
          className="mt-6 lg:hidden rounded-full h-12 w-12 flex items-center justify-center  transition cursor-pointer"
          onClick={() => signOut()}
        >
          <Avatar className="w-full h-full">
            <AvatarImage src={data?.profileImage} />
            <AvatarFallback>{data?.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Popover>
        <PopoverTrigger className="w-full rounded-full hover:bg-gray-500 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={data?.profileImage}/>
                <AvatarFallback>{data?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-start items-start">
                <p className="text-sm line-clamp-1 text-start ">{data?.name}</p>
                {data?.username ? (
                  <p className="text-sm dark:text-zinc-500 text-zinc-600">@{data?.username}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <MoreHorizontal size={22} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="">
          <div
            className=" cursor-pointer  hover:bg-opacity-10 transition"
            onClick={() => signOut()}>
            <span className="text-sm">Log out {data?.username ? `@${data?.username}` : data?.name}</span>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarAccount;
