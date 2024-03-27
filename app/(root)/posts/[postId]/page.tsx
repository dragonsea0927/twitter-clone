"use client";
import CommentFeed from "@/components/post/comment-feed";
import PostItem from "@/components/post/post-item";
import Header from "@/components/shared/header";
import Tweet from "@/components/shared/tweet-form";

import usePost from "@/hooks/usePost";

import { useSession } from "next-auth/react";

const page = ({ params }: { params: { postId: string } }) => {
  const { data: session }: any = useSession();
  const postId = params.postId;
  const { data: post } = usePost(postId);

  return (
    <>
      <Header label="Tweet" isBack />
      <PostItem post={post} />
      <Tweet
        retweet
        placeholder="Post your reply"
        postId={postId as string}
        user={session?.currentUser}
      />
      <CommentFeed comments={post?.comments} />
    </>
  );
};

export default page;
