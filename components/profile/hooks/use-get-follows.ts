import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types";
import { getFollow } from "../api/get-follow";

export const useGetFollows = ({
  id,
  type,
}: {
  id: string | undefined;
  type: string | undefined;
}) => {
  return useQuery<IUser[]>({
    queryKey: ["users", id, type],
    queryFn: async () => {
      return getFollow(id, type);
    },
    refetchOnWindowFocus: false,
  });
};
