"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { CalendarDays, MapPin } from "lucide-react";
import { IUser } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import { getSession, useSession } from "next-auth/react";
import useFollow from "@/hooks/useFollow";
import useLoginModal from "@/hooks/useLoginModal"; 
import useFollowModal from "@/hooks/useFollowModal";
import FollowModal from "../modal/follow-modal";
import useEditModal from "@/hooks/useEditModal";
import EditModal from "../modal/edit-modal";
import useUser from "@/hooks/useUser";

interface Props {
  data: IUser;
}

const ProfileBio = ({ data }: Props) => {

  const editModal = useEditModal();

  const { data: session }: any = useSession();
  const loginModal = useLoginModal();
  const followModal = useFollowModal();

  const currentUserId = session?.currentUser?._id;

  useEffect(() => {
    return () => {
      followModal.onClose();
    };
  }, []);

  const { hasFollow, toggleFollow } = useFollow({
    currentUserId,
    userId: data?._id,
  });

  const onFollowModal = useCallback(
    (tabName:string,e:any) => {
      e.stopPropagation();
 
      
      followModal.onOpen();
      followModal.setDefaultTab(tabName)
    },
    [followModal]
  );

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

  const onEditModal = useCallback(()=>{
    editModal.onOpen();
  },[editModal])

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <>
      <FollowModal data={data} />
      <EditModal data={data}/>
      <div className="border-b-[1px] pb-4">
        <div className="flex justify-end p-4">
          {currentUserId === data?._id ? (
            <Button onClick={onEditModal} className="w-fit">
              Edit profile
            </Button>
          ) : (
            hasFollow ? (
              <Button onClick={onAction} className="w-fit" variant={"outline"}>
                UnFollow
              </Button>
            ) : (
              <Button onClick={onAction} className="w-fit">
                Follow
              </Button>
            )
          )}
        </div>

        <div className="mt-2 px-4">
          <div className="flex flex-col">
            <p className="text-xl font-semibold">{data?.name}</p>
          </div>
          <p className="text-base text-neutral-500">
          {data?.username ? `@${data.username}` : data?.email}
            </p>

          <div className="flex flex-col mt-4">
            <p className="">{data?.bio}</p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-row items-center gap-2 mt-4 text-sky-500">
                <MapPin size={18} />
                <span className="text-sm">{data?.location || "Earth"}</span>
              </div>
              <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                <CalendarDays size={18} />
                <span className="text-sm">Joined {createdAt} ago</span>
              </div>
            </div>
            <div className="flex flex-row text-sm items-center mt-4 gap-6">
              <div
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                onClick={(e:any)=> onFollowModal('following',e) }>
                <span>{data?.following.length || 0}</span>
                <span className="text-zinc-500">Following</span>
              </div>
              <div
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                onClick={(e:any)=> onFollowModal('followers',e) }>
                <span >{data?.followers.length || 0}</span>
                <span className="text-neutral-500">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBio;
