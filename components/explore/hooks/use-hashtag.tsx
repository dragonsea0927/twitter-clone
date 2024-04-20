import { useQueries, useQuery } from "@tanstack/react-query";
import { IHashtag } from "../types";
import { getHashtags } from "../api/get-hashtags";

export const useHashtags = ({ limit }: { limit?: number }) => {
  return useQuery<IHashtag[]>({
    queryKey: ["hashtags"],
    queryFn: async () => {
      return getHashtags({ limit });
    },
  });
};
