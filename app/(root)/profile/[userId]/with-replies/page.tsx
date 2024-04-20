import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import Profile from "@/components/profile/profile";
import ProfileTweetsAndReplies from "@/components/profile/profile-tweets-and-replies";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserMetadata({
    user_id: params.userId,
    type: "tweets",
  });

  return (
    <>
      <ProfileHeader
        heading={user?.name ?? undefined}
        stats={`${user?._count?.posts} ${
          user?._count?.posts === 1 ? "tweet" : "tweets"
        }`}
      />

      <Profile initialUser={user as any} />
      <ProfileTweetsAndReplies />
    </>
  );
};

export default page;
