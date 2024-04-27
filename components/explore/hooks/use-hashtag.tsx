import { useQueries, useQuery } from "@tanstack/react-query";
import { IHashtag } from "../types";
import { getHashtags } from "../api/get-hashtags";

export const useHashtags = ({
  limit,
  queryKey,
}: {
  limit: number;
  queryKey: string[];
}) => {
  return useQuery<IHashtag[]>({
    queryKey,
    queryFn: async () => {
      return getHashtags({ limit });
    },
  });
};
