 
import ProfileHeader from "@/components/header/profile-header";
import { getUserMetadata } from "@/components/profile/api/get-user-metadata";
import Profile from "@/components/profile/profile";
import ProfileTweets from "@/components/profile/profile-tweets";
 
interface Props {
  userId: string;
}

const page = async ({ params }: { params: Props }) => {

  const user = await getUserMetadata({
    user_id: params.userId,
    type: "tweets",
  });


  console.log('USER META DATA',user);
  
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
      <ProfileTweets />
    </>
  );
};

export default page;
