import React from "react";
import { ITweet } from "./types";
import CommentButton from "./actions/comment-button";
import LikeButton from "./actions/like-button";
import RetweetButton from "./actions/retweet-button";
import ShareButton from "./actions/share-button";
import BookmarkButton from "./actions/bookmark-button";

const TweetActions = ({ tweet }: { tweet: ITweet }) => {
  return (
    <>
      <CommentButton tweet={tweet} />
      <RetweetButton  />
      <LikeButton post={tweet} />
      <ShareButton  />
      <BookmarkButton  post={tweet}/>
    </>
  );
};

export default TweetActions;
