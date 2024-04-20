import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../api/follow-user";
import { unfollowUser } from "../api/unfollow-user";

export const useFollow = (
  type: "follow" | "unfollow",
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      user_id,
      session_owner_id,
    }: {
      user_id: string;
      session_owner_id: string;
    }) => {
      return type === "follow"
        ? followUser(user_id, session_owner_id)
        : unfollowUser(user_id, session_owner_id);
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      console.log("error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["people-to-follow"] });
    },
  });
};
