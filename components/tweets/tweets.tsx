"use client";

import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";
import { useTweets } from "./hooks/use-tweets";
import { InfiniteTweets } from "./infinite-tweet";


export const Tweets = () => {
  
  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({});

  if (isLoading) {
    return  <LoadingSpinner/>;
  }

  if (isError) {
    return <TryAgain/>;
  }

  return (
    <InfiniteTweets
      tweets={tweets}
      isSuccess={isSuccess}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};
