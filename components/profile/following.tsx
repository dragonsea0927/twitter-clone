"use client";
import React from "react";
import { useGetFollows } from "./hooks/use-get-follows";
import { usePathname } from "next/navigation";
import PersonDetails from "../connect/person-details";
import { useUser } from "./hooks/use-user";
import NoFollowers from "./no-followers";
import LoadingSpinner from "../elements/loading/loading-spinner";

const Following = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const {
    data: followingData,
    isLoading,
    isError,
  } = useGetFollows({ id, type: "following" });

  const { data: oneUser } = useUser({ id });

  if (isLoading) {
    return  <LoadingSpinner/>
  }

  if (isError) {
    return (
      <>
        <p>Try again</p>
      </>
    );
  }
  return (
    <div>
        
      {followingData?.length === 0 ? (
        <NoFollowers
          title={`@${oneUser?.username} isn't following anyone`}
          subtitle="Once they follow accounts, they’ll show up here."
        />
      ) : (
        <div>
          {followingData?.map((user) => {
            return <PersonDetails key={user?.id} author={user} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Following;
