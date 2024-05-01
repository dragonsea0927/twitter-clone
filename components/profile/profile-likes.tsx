"use client";
import React from "react"; 
import { usePathname } from "next/navigation"; 
import { InfiniteTweets } from "../tweets/infinite-tweet";
import { useTweets } from "../tweets/hooks/use-tweets";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";
import NoTweetsFound from "./no-tweets-found";
import { IUser } from "./types";

const ProfileLikes = ({user}:{user:IUser}) => {
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
    return <TryAgain/>;
  }
  if (isLoading) {
    return  <LoadingSpinner/>;
  }

  if (!tweets || !tweets.pages || tweets.pages.some(page => page.tweets.length === 0)) {
    return <NoTweetsFound username={user.username} label={'liked any posts'}/>
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
