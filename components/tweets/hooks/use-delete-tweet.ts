import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTweet } from "../api/delete-tweet";
import { usePathname, useRouter } from "next/navigation";

export const useDeleteTweet = () => {
  const pathname = usePathname().split(`/`)[1];
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tweetId,
      userId,
      pinned,
    }: {
      tweetId: string;
      userId: string;
      pinned?: boolean;
    }) => {
      if (pathname === "posts") {
        router.back();
      }

      return deleteTweet({ tweetId, userId, pinned });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      console.log("error");
    },
  });
};
