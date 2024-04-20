import axios from "axios";

export const getUser = async (id: string | undefined) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
