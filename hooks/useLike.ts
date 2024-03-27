import { IPost } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import usePosts from "./usePosts";
import usePost from "./usePost";

interface Props {
  post: IPost;
  postId: string;
  userId?: string;
}

const useLike = ({ post, postId, userId }: Props) => {
  const { data }: any = useSession();
  const { mutate: mutatePosts } = usePosts(userId as string);
  const { mutate: mutatePost } = usePost(postId as string);
  const currentUser = data?.currentUser;

  const hasLiked = useMemo(() => {
    const list = post?.likes || [];

    return list.includes(currentUser?._id);
  }, [post, currentUser]);

  const toggleLike = useCallback(async () => {
    try {
      let request;
      if (hasLiked) {
        request = () =>
          axios.delete("/api/likes", {
            data: {
              postId,
            },
          });
      } else {
        request = () => axios.put("/api/likes", { postId });
      }

      await request();
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.log("ERROR", error);
    }
  }, [postId, mutatePosts, hasLiked]);

  return { hasLiked, toggleLike };
};

export default useLike;
