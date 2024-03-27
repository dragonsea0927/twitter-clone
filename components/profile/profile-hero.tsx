import Image from "next/image";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import useUser from "@/hooks/useUser";

const ProfileHero = ({ user }: { user: IUser }) => {
  return (
    <div className="h-44 relative">
      {user?.coverImage ? (
        <Image
          fill
          src={user?.coverImage}
          alt="CoverImage"
          style={{ objectFit: "cover" }}
        />
      ) : (
         <div className="w-full h-full bg-zinc-900 ">
         </div>
      )}

      <div className="absolute -bottom-16 left-4">
        <Avatar className="w-32 h-32 border-4 border-white dark:border-black dark:bg-black">
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback className="text-7xl">{user?.name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProfileHero;
