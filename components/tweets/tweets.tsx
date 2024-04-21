"use client";

import LoadingSpinner from "../elements/loading/loading-spinner";
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
    return <p>Try agian...</p>;
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
