import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import { sliceText } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import useFollow from "@/hooks/useFollow";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

const UserItem = ({ user }: { user: IUser }) => {
  const { data: session }: any = useSession();
  const currentUserId = session?.currentUser?._id;
  const loginModal = useLoginModal();

  const { hasFollow, toggleFollow } = useFollow({
    currentUserId,
    userId: user?._id,
  });

  const onAction = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!session?.currentUser) {
        loginModal.onOpen();
      }
      toggleFollow();
    },
    [loginModal, session?.currentUser, toggleFollow]
  );

  const onProfile = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="items-center  hover:bg-zinc-400/10 py-2 px-3">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Link href={`/profile/${user._id}`}>
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col line-clamp-1">
            <p className=" font-semibold text-sm line-clamp-1">{user.name}</p>
            <p className="line-clamp-1 overflow-hidden text-sm dark:text-zinc-500 text-zinc-600">
              {user.username ? `@${user.username}` : `${user.email}`}
            </p>
          </div>
        </div>
        {hasFollow ? (
          <Button onClick={onAction} className="w-fit" variant={"outline"}>
            UnFollow
          </Button>
        ) : (
          <Button onClick={onAction} className="w-fit">
            Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserItem;
