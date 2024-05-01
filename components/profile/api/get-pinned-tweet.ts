import axios from "axios";

export const getPinnedTweet = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(`/api/tweets/pin?user_id=${id}`);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
