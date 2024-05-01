import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import Profile from "@/components/profile/profile";
import ProfileLikes from "@/components/profile/profile-likes";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> {
  const user = await getUserMetadata({
    user_id: params.userId,
    type: "tweets",
  });

  if (!user) {
    return { title: "User not found" };
  }

  return {
    title: `Posts liked by ${user.name} (@${user.username})`,
  };
}

const page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserMetadata({
    user_id: params.userId,
    type: "likes",
  });

  return (
    <>
      <ProfileHeader
        heading={user?.name ?? undefined}
        stats={`${user?._count?.Like} ${
          user?._count?.Like === 1 ? "like" : "likes"
        }`}
      />

      <Profile initialUser={user as any} />
      <ProfileLikes user={user as any}/>
    </>
  );
};

export default page;
