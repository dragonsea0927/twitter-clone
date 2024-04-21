import React, { useState } from "react";
import { IUser } from "./types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import FollowButton from "../elements/follow-button/follow-button";
import { following } from "./utils/following";
import { HiDotsHorizontal } from "react-icons/hi";
import { UserJoinDate } from "./user-join-date";
import Link from "next/link";
import EditProfileModal from "./edit-profile-modal"; 
import { MapPin } from "lucide-react";

const ProfileInfo = ({ user, id }: { user: IUser; id: string }) => {
  const { data: session }: any = useSession();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const isFollowing = following({
    user: user,
    session_owner_id: session?.currentUser?.id,
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="aspect-[3/1]">
          {user?.coverImage ? (
            <div className="relative w-full h-full">
              <Image
                fill
                src={user?.coverImage}
                alt="CoverImage"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-900 "></div>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-4 w-[clamp(70px,20vw,146px)] h-[clamp(70px,20vw,146px)] transform -translate-y-1/2">
            <Avatar className="border-4 border-white dark:border-black object-cover w-full h-full">
              <AvatarImage
                src={user?.profileImage || "/images/user_placeholder.png"}
              />
              <AvatarFallback className="text-7xl"></AvatarFallback>
            </Avatar>
          </div>

          <div className="flex justify-end p-4">
            {session?.currentUser?.id === user?.id ? (
              <Button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="w-fit"
                variant={"outline"}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 ">
                <Button
                  onClick={() => {}}
                  className="w-fit p-2"
                  variant={"outline"}
                >
                  <HiDotsHorizontal size={18} />
                </Button>

                <FollowButton
                  isFollowing={isFollowing}
                  session_owner_id={session?.currentUser?.id}
                  username={user?.username as string}
                  user_id={user?.id}
                />
              </div>
            )}
          </div>

          <div className="mt-2 px-4 space-y-3">
            <div className="flex flex-col">
              <span className="text-xl font-semibold ">{user?.name}</span>
              <span className="text-sm mt-1 text-neutral-500">
                {user?.username ? `@${user.username}` : user?.email}
              </span>
            </div>

            {user?.bio && (
              <div>
                <span className="text-sm">{user?.bio}</span>
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex gap-4 items-center">
                {user?.location && (
                  <div className="flex flex-row items-center gap-1 text-light-gray">
                    <MapPin size={16} />
                    <span className="text-sm">{user?.location}</span>
                  </div>
                )}

                {user.createdAt && <UserJoinDate date={user.createdAt} />}
              </div>
            </div>
            <div className="flex flex-row text-sm items-center mt-4 gap-6">
              <Link
                href={`/profile/${id}/following`}
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="">{user?._count?.following}</span>
                <span className="text-light-gray">Following</span>
              </Link>
              <Link
                href={`/profile/${id}/followers`}
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="">{user?._count?.followers}</span>
                <span className="text-light-gray">Followers</span>
              </Link>
            </div>
          </div>
        </div>

        {isEditProfileModalOpen && (
          <EditProfileModal
            user={user}
            closeModal={() => setIsEditProfileModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
