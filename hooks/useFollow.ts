import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { useCallback, useMemo } from "react";
import useUser from "./useUser";
import axios from "axios";
import { IUser } from "@/types";

interface Props {
  currentUserId: string;
  userId: string;
}
const useFollow = ({ currentUserId, userId }: Props) => {
 
  const { data, mutate: mutateCurrentUser } = useUser({
    userId: currentUserId,
  });
  const { mutate: mutateUser } = useUser({ userId });

  const hasFollow = useMemo(() => {
    let list = data?.following || [];
   
    return list.some((user:IUser) => user._id === userId);
  }, [data?.following, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      let request;
      if (hasFollow) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.put("/api/follow", { userId });
      }

      await request();
      mutateUser();
      mutateCurrentUser();
    } catch (error) {
      console.log("ERROR", error);
    }
  }, [hasFollow, userId, mutateUser, mutateCurrentUser]);

  return { hasFollow, toggleFollow };
};

export default useFollow;
