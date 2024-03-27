"use client";
import Header from "@/components/shared/header";
import UserItem from "@/components/shared/user-item"; 
import useUsers from "@/hooks/useUsers";
import { IUser } from "@/types"; 
import React from "react";

const page = () => { 
  const { data = [] } = useUsers();

  return (
    <>
      <Header label="Explore" isBack />
      <div className="px-2">
        {data.map((user: IUser) => (
          <UserItem user={user} />
        ))}
      </div>
    </>
  );
};

export default page;
