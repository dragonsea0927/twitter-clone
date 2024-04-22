"use client";
import React from "react";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";
import { useTweets } from "../tweets/hooks/use-tweets";

const Explore = () => {
  const {
    data: tweets,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useTweets({});

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return <TryAgain />;
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

export default Explore;
