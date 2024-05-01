import axios from "axios";

export const deleteTweet = async ({
  tweetId,
  userId,
  pinned,
}: {
  tweetId: string;
  userId: string;
  pinned?: boolean;
}) => {
  try {

    console.log('MY pinned',pinned);
    
    const { data } = await axios.delete(
      `/api/tweets?id=${tweetId}&userId=${userId}&pinned=${pinned}`
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
