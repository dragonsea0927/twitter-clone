import axios from "axios";
import { postMedia } from "./post-media";
import { retrieveHastagsFromTweet } from "@/components/explore/api/retrieve-hashtags-from-tweet";
import { postHashtags } from "@/components/explore/api/post-hashtags";

export const PostTweet = async ({
  text,
  userId,
  files,
  in_reply_to_screen_name,
  in_reply_to_tweet_id,
}: {
  text: string;
  userId: string;
  files: File[];
  in_reply_to_screen_name?: string | null;
  in_reply_to_tweet_id?: string | null;
}) => {
  const tweet = {
    body: text,
    userId,
    ...(in_reply_to_screen_name && { in_reply_to_screen_name }),
    ...(in_reply_to_tweet_id && { in_reply_to_tweet_id }),
  };
  try {
    const { data } = await axios.post("/api/tweets", { tweet });

    if (files.length > 0) {
      await postMedia({ files, tweet_id: data.id });
    }

    const hashtags = retrieveHastagsFromTweet(text);
    if (hashtags) {
      await postHashtags(hashtags);
    }

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
