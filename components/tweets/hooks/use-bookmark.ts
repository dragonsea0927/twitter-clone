import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookmark } from "../api/toggleBookmark";

export const useBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
    }: {
        tweetId: string;
        userId: string;
    }) => {
        
      return toggleBookmark({ tweetId, userId });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
    onError:() => {
        console.log('error');
        
    }
  });
};
