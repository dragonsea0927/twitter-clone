import axios from "axios";

export const getHashtags = async ({ limit }: { limit: number }) => {
  try {

    const { data } = await axios.get(
      `/api/hashtags${limit ? `?limit=${limit}` : ""}`
    );

    return data;
  } catch (error: any) {
    return error.message;
  }
};
