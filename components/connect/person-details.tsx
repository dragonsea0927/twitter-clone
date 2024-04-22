import React from "react";
import { IUser } from "../profile/types";
import { useSession } from "next-auth/react";
import { following } from "../profile/utils/following";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "../elements/follow-button/follow-button";

const PersonDetails = ({ author }: { author: IUser }) => {
  const { data: session }: any = useSession();
  const router = useRouter();

  const isFollowing = following({
    user: author,
    session_owner_id: session?.currentUser?.id,
  });

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/profile/${author?.id}`);
          }
        }}
        onClick={() => {
          router.push(`/profile/${author?.id}`);
        }}
        className="w-full flex gap-3 py-3 px-4 cursor-pointer transition-colors ease-in-out "
      >
        <div className="">
          <Avatar>
            <AvatarImage src={author?.profileImage ?? ""} alt="@shadcn" />
            <AvatarFallback>{author?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full">
          <div className="">
            <div className="flex  flex-row justify-between items-center">
              <div className="flex flex-col">
                <span className="hover:underline font-semibold">
                  {author?.name}
                </span>
                <span className="text-sm text-light-gray ">
                  @{author?.username}
                </span>
              </div>

              {session?.currentUser?.id === author?.id ? (
                ""
              ) : (
                <FollowButton
                  user_id={author?.id}
                  session_owner_id={session?.currentUser?.id}
                  isFollowing={isFollowing}
                />
              )}
            </div>
          </div>
          {author?.bio && <span className="text-sm">{author.bio}</span>}
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
