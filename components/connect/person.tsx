import React from "react";
import { IUser } from "../profile/types";
import { useSession } from "next-auth/react";
import { following } from "../profile/utils/following";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "../elements/follow-button/follow-button";

const Person = ({ person }: { person: IUser }) => {
  const { data: session }: any = useSession();
  const router = useRouter();

  const isFollowing = following({
    user: person,
    session_owner_id: session?.currentUser?.id,
  });

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/profile/${person?.id}`);
          }
        }}
        onClick={() => {
          router.push(`/profile/${person?.id}`);
        }}
        className="w-full flex gap-3 py-3 px-4 cursor-pointer transition-colors ease-in-out "
      >
        <div className="">
          <Avatar>
            <AvatarImage src={person?.profileImage ?? ""} alt="@shadcn" />
            <AvatarFallback>{person?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full">
          <div className="">
            <div className="flex  flex-row justify-between items-center">
              <div className="flex flex-col">
                <span className="hover:underline font-semibold">{person?.name}</span>
                <span className="text-sm text-light-gray">
                  @{person?.username}
                </span>
              </div>

              <FollowButton
                user_id={person?.id}
                session_owner_id={session?.currentUser?.id}
                isFollowing={isFollowing}
              />
            </div>
          </div>
           
        </div>
      </div>
    </>
  );
};

export default Person;
