"use client";
import PostItem from "@/components/post/post-item";
import Header from "@/components/shared/header";
import Tweet from "@/components/shared/tweet-form";
import usePosts from "@/hooks/usePosts";
import { IPost } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session, status }: any = useSession();
  const { data: posts } = usePosts();

  return (
    <div>
      <Header label="Home" />
      <Tweet placeholder="What is happening?!" user={session?.currentUser} />
      {posts && posts.map((post: IPost) => <PostItem post={post} key={post._id} /> )}
    </div>
  );
};

export default page;
