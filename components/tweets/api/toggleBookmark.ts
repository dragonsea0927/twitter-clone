import axios from "axios";

export const toggleBookmark = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => { 
  try {
    const { data } = await axios.post("/api/tweets/bookmarks", {
      tweet_id : tweetId,
      user_id : userId,
    });
    return data;
  } catch (error: any) {
    return error.message;
  }
};
