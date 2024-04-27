import { useQuery } from "@tanstack/react-query";
import { getHashtags } from "../api/get-hashtags";
import { IHashtag } from "../types";

export const useHashtagsDialog = ({ limit }: { limit: number }) => {
  return useQuery<IHashtag[]>({
    queryKey: ["hashtags"],
    queryFn: async () => {
      return getHashtags({ limit : limit });
    },
  });
};
