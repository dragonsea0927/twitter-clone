"use client";
import PostItem from "@/components/post/post-item";
import ProfileBio from "@/components/profile/profile-bio";
import ProfileHero from "@/components/profile/profile-hero";
import Header from "@/components/shared/header";
import usePosts from "@/hooks/usePosts";
import useUser from "@/hooks/useUser";
import { IPost } from "@/types";
import React, { useEffect, useState } from "react";

interface Props {
  userId: string;
}

const page = ({ params }: { params: Props }) => {
  const { userId } = params;

  const { data, mutate: mutateUser } = useUser({ userId });
  const { data: posts = [] } = usePosts(userId);


  return (
    <>
      <Header label={data?.name} isBack tweets={posts?.length} subLabel />
      <ProfileHero user={data} />
      <ProfileBio data={data} />
      {posts.map((post: IPost) => (
        <PostItem post={post} key={post._id} userId={userId} />
      ))}
    </>
  );
};

export default page;
