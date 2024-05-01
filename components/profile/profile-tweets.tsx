"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTweets } from "../tweets/hooks/use-tweets";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";
import PinnedTweet from "./pinned-tweet";
import NoTweetsFound from "./no-tweets-found";
import { IUser } from "./types"; 

const ProfileTweets = ({ user }: { user: IUser }) => {
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
    queryKey: ["tweets", id],
    type: "user_tweets",
    id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  if (
    !tweets ||
    !tweets.pages ||
    tweets.pages.some((page) => page.tweets.length === 0)
  ) {
    return <NoTweetsFound username={user.username} label="tweets" />;
  }

   
 
  return (
    <>
      <PinnedTweet userId={id} />

      <InfiniteTweets
        tweets={tweets}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default ProfileTweets;
