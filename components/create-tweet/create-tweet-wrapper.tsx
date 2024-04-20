import React from "react";
import CreateTweet from "./create-tweet";

const CreateTweetWrapper = ({
  in_reply_to_screen_name,
  in_reply_to_tweet_id,
}: {
  in_reply_to_screen_name: string | undefined;
  in_reply_to_tweet_id: string | null;
}) => {
  return (
    <>
      <div>
        <CreateTweet
          placeholder={`Tweet your reply!`}
          in_reply_to_screen_name={in_reply_to_screen_name}
          in_reply_to_tweet_id={in_reply_to_tweet_id}
        />
      </div>
    </>
  );
};

export default CreateTweetWrapper;
