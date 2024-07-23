"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useTweets } from "../tweets/hooks/use-tweets";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import NoBookmarks from "./no-bookmarks";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";

const Bookmarks = () => {
  const { data: session }: any = useSession();

  const {
    data: bookmarks,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTweets({
    queryKey: ["bookmarks", session?.currentUser?.id],
    type: "bookmarks",
    id: session?.currentUser?.id,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if(isError) {
    return <TryAgain/>
  }

  return (
    <>
      {isSuccess && bookmarks?.pages[0]?.tweets?.length === 0 ? (
        <NoBookmarks />
      ) : (
        <InfiniteTweets
          tweets={bookmarks}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
};

export default Bookmarks;
