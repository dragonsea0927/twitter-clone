"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { useUser } from "../profile/hooks/use-user";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const { data: session }: any = useSession();
  const { data: user } = useUser({ id: session?.currentUser?.id });

  const router = useRouter();

  return (
    <div className="sm:hidden">
      <Avatar
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/profile/${user?.id}`);
        }}
        className="h-8 w-8 my-[2px] cursor-pointer"
      >
        <AvatarImage
          src={user?.profileImage || `/images/user_placeholder.png`}
        />
      </Avatar>
    </div>
  );
};

export default ProfileButton;
