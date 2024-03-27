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
  const { data: session }:any = useSession();
  const currentUserId: string | undefined = typeof session?.currentUser?._id === 'string' ? session.currentUser._id : undefined;

  const { mutate: mutatePosts } = usePosts(userId as string);
  const { mutate: mutatePost } = usePost(postId as string);
   
 
  const hasLiked = useMemo(() => {
    const list = post?.likes || [];
    if (Array.isArray(list)) {
      return list.some(id => id === currentUserId);
    }
    return false;
  }, [post, currentUserId]);

  
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
