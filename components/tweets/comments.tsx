import React from "react";
import { useTweets } from "./hooks/use-tweets";
import { InfiniteTweets } from "./infinite-tweet";
import LoadingSpinner from "../elements/loading/loading-spinner";

const Comments = ({ tweetId }: { tweetId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  } = useTweets({
    queryKey: ["tweets", tweetId, "comments"],
    type: "comments",
    id: tweetId,
  });

  if (isLoading) {
    return  <LoadingSpinner/>;
  }

  if (isError) {
    return <p>Try again</p>;
  }

  return (
    <>
      <InfiniteTweets
        tweets={comments}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
      />
    </>
  );
};

export default Comments;
