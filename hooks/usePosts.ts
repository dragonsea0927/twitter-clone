import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = (userId?: string) => {
  let url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default usePosts;
