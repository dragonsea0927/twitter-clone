"use client";
import React from "react";
import { Header } from "../header/header";
import { useSession } from "next-auth/react";

const BookmarksHeader = () => {
  const { data: session }: any = useSession();
  return (
    <Header>
      <div className="">
        <span className="flex">Bookmarks</span>
        <div className="grid grid-flow-col truncate">
          {session?.currentUser?.username && (
            <span className="text-sm font-normal text-light-gray">
              @{session?.currentUser?.username}
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default BookmarksHeader;
