"use client";
import { usePathname } from "next/navigation";
import React from "react"; 
import { useTweets } from "../tweets/hooks/use-tweets";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import LoadingSpinner from "../elements/loading/loading-spinner";

const ProfileMedia = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2] as string;

  const {
    data: tweets,
    isError,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isSuccess,
    hasNextPage,
  } = useTweets({
    queryKey: ["tweets", id, "media"],
    type: "user_media",
    id,
  });

  if (isLoading) {
    return  <LoadingSpinner/>;
  }

  if (isError) {
    return <p>Try again</p>;
  }

  return (
    <InfiniteTweets
      tweets={tweets}
      isSuccess={isSuccess}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default ProfileMedia;
