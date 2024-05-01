import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import Profile from "@/components/profile/profile";
import ProfileTweets from "@/components/profile/profile-tweets";

import type { Metadata } from "next";

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
    title: `${user.name} (@${user.username})`,
  };
}

const page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserMetadata({
    user_id: params.userId,
    type: "tweets",
  });

  if (!user) return <p>NOT FOUND</p>;

  return (
    <>
      <ProfileHeader
        heading={user.name ?? undefined}
        stats={`${user?._count?.posts} ${
          user?._count?.posts === 1 ? "tweet" : "tweets"
        }`}
      />
      <Profile initialUser={user as any} />
      <ProfileTweets user={user as any} />
    </>
  );
};

export default page;
