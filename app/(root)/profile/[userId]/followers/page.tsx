
import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import Followers from "@/components/profile/followers";
import FollowersNavigation from "@/components/profile/followers-navigation";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserMetadata({ user_id: params.userId });

  return (
    <>
      <ProfileHeader
        heading={user?.name ?? undefined}
        stats={`@${user?.username}`}
      />

      <FollowersNavigation/>
      <Followers/>
    </>
  );
};

export default page;
