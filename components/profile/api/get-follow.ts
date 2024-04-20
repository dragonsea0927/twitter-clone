import axios from "axios";

export const getFollow = async (
  id: string | undefined,
  type: string | undefined
) => {
  try {
    const { data } = await axios.get(
      `/api/users/follow?type=${type}&user_id=${id}`
    );

    return data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
