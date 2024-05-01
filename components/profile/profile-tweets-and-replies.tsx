'use client'
import { usePathname } from "next/navigation";
import React from "react";
import { useTweets } from "../tweets/hooks/use-tweets";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";
import PinnedTweet from "./pinned-tweet";
import { IUser } from "./types";
import NoTweetsFound from "./no-tweets-found";

const ProfileTweetsAndReplies = ({user}:{user:IUser}) => {
  const pathname = usePathname();
  const id = pathname.split("/")[2] as string;

  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({
    queryKey: ["tweets", id, "replies"],
    type: "user_replies",
    id,
  });


  if(isError){
    return <TryAgain/>
  }

  if(isLoading){
    return <LoadingSpinner/>
  }

  if (!tweets || !tweets.pages || tweets.pages.some(page => page.tweets.length === 0)) {
    return <NoTweetsFound username={user.username} label={'replies'}/>
  }

  return (<>

        <InfiniteTweets 
            tweets={tweets}
            isSuccess={isSuccess}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
        />

    </>);
};

export default ProfileTweetsAndReplies;
