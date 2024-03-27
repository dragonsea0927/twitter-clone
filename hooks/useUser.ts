import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useUser = ({ userId }: { userId: string }) => {
  const url = userId ? `/api/users/${userId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useUser;
