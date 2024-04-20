 
import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import FollowersNavigation from "@/components/profile/followers-navigation";
import Following from "@/components/profile/following";
import React from "react";

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
