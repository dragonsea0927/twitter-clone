 
import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import FollowersNavigation from "@/components/profile/followers-navigation";
import Following from "@/components/profile/following";
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
    title: `Peopple followed by ${user.name} (@${user.username})`,
  };
}


const page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserMetadata({ user_id: params.userId });

  return (
    <>
      <ProfileHeader
        heading={user?.name ?? undefined}
        stats={`@${user?.username}`}
      />

      <FollowersNavigation />
      <Following/>

    </>
  );
};

export default page;
