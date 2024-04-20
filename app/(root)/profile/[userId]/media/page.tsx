import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import Profile from "@/components/profile/profile";
import ProfileMedia from "@/components/profile/profile-media";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {

  const user = await getUserMetadata({
    user_id: params.userId,
    type: "media",
  });

  return (
    <div>
      <ProfileHeader
        heading={user?.name ?? undefined}
        stats={`${user?._count?.posts} ${
          user?._count?.posts === 1 ? "Photo & video" : "Photos & videos"
        }`}
      />
      <Profile initialUser={user as any} />
      <ProfileMedia />
    </div>
  );
};

export default page;
