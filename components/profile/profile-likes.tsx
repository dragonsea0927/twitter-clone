"use client";
import React from "react"; 
import { usePathname } from "next/navigation"; 
import { InfiniteTweets } from "../tweets/infinite-tweet";
import { useTweets } from "../tweets/hooks/use-tweets";
import LoadingSpinner from "../elements/loading/loading-spinner";

const ProfileLikes = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2] as string;

  const {
    data: tweets,
    isError,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({
    queryKey: ["tweets", id, "likes"],
    id,
    type: "user_likes",
  });

  if (isError) {
    return <p>Try again</p>;
  }
  if (isLoading) {
    return  <LoadingSpinner/>;
  }

  return (
    <>
      <InfiniteTweets
        tweets={tweets}
        isSuccess={isSuccess}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default ProfileLikes;
