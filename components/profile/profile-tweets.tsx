"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useTweets } from "../tweets/hooks/use-tweets";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import LoadingSpinner from "../elements/loading/loading-spinner";
 

const ProfileTweets = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2] as string;

  const {
    data: tweets,
    isError,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useTweets({
     queryKey: ["tweets", id], 
     type: "user_tweets",
      id 
    });
    
    if(isLoading){
        return <LoadingSpinner/>
    }

    if(isError){
        return <><p>Try again</p></>
    }

  return (
    <>
        <div>
            <InfiniteTweets 
            tweets={tweets}
            isFetchingNextPage={isFetchingNextPage}
            isSuccess={isSuccess}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            />
        </div>
    </>
  );
};

export default ProfileTweets;
