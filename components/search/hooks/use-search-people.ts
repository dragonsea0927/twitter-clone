import { useQuery } from "@tanstack/react-query";
import { getQueryPeople } from "../api/get-query-people"; 
import { IUser } from "@/components/profile/types";

export const useSearchPeople = (query: string | undefined) => {
  return useQuery<IUser[]>({
    queryKey: ["people", "query", query],
    queryFn: async () => {
      return getQueryPeople(query);
    },
    refetchOnWindowFocus: false,
    enabled: !!query,
  });
};
