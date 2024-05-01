import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { pinTweet } from "../api/pin-tweet";
import { unPinTweet } from "../api/unpin-tweet";

export const usePinnedTweet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
      action,
    }: {
      tweetId?: string;
      userId: string;
      action: string;
    }) => {
      return action === "pin" ? pinTweet(tweetId, userId) : unPinTweet(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: () => {
      console.log("error");
    },
  });
};
