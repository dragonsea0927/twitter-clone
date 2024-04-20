import axios from "axios";

export const toggleLike = async ({
  tweetId,
  userId,
}: {
  tweetId: string | undefined;
  userId: string | undefined;
}) => {
  try {
    const { data } = await axios.post("/api/tweets/likes", {
      tweet_id: tweetId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    console.log('Error', error);
    return error.message;
  }
};
