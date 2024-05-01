import { ITweet } from "@/components/tweets/types";
import { useQuery } from "@tanstack/react-query";
import { getPinnedTweet } from "../api/get-pinned-tweet";

export const usePinnedTweet = (id:string|undefined) => {
  return useQuery<ITweet>({
    queryKey: ["tweets", { userId: id }, `pinned`],
    queryFn: async () => {
      return getPinnedTweet(id);
    },
    refetchOnWindowFocus: false,
  });
};
