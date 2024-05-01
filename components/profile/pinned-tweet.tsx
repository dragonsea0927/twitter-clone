import React from "react";
import Tweet from "../tweets/tweet";
import { usePinnedTweet } from "./hooks/use-pinned-tweet";

const PinnedTweet = ({ userId }: { userId: string }) => {
  const { data: pinnedTweet } = usePinnedTweet(userId);
  
  if (!pinnedTweet) return null;
  return (
    <div>
      <Tweet tweet={pinnedTweet} pinned={true}/>
    </div>
  );
};

export default PinnedTweet;
