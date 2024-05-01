 
import { TweetHeader } from "@/components/header/tweet-header";
import { getTweetMetadata } from "@/components/tweets/api/getTweetMetadata";
import TweetDetails from "@/components/tweets/tweet-details";
 

const page = async ({ params }: { params: { postId: string } }) => {
 
  const initialTweet = await getTweetMetadata({
    tweet_id: params.postId,
  });

  return (
    <>
      <TweetHeader/>
      <TweetDetails initialTweet={initialTweet as any} />
      
    </>
  );
};

export default page;

export const metadata = {
  title: "Post",
};
