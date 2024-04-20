import { useQuery } from "@tanstack/react-query";

 
import { ITweet } from "../types";
import getTweet from "../api/get-tweet";

export const useTweet = ({
  id,
  initialData,
}: {
  id: string;
  initialData?: ITweet;
}) => {
  return useQuery<ITweet>({
    queryKey: ["tweets", id],
    queryFn: async () => {
      return getTweet(id);
    },
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
  });
};
