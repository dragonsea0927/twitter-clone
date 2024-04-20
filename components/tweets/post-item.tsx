"use client";
import { MessageCircleMore } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import LikeButton from "./actions/like-button";
import { ITweet } from "./types"; 

interface Props {
  post: ITweet;
}

const PostItem = ({ post }: Props) => {
 
 
  const router = useRouter();

  const goToPost = (e: any) => {
    e.stopPropagation();
    router.push(`/posts/${post?.id}`);
  };

  const goToProfile = useCallback((e: any) => {
    e.stopPropagation();
    router.push(`/profile/${post.user.id}`);
  }, []);

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post?.createdAt]);

  return (
    <>
      <div className="border-b-[1px]  p-5 cursor-pointer  transition relative">
         

        <div
          className="flex flex-row gap-3 w-full cursor-pointer"
          onClick={goToPost}
        >
          <Avatar onClick={goToProfile} className="h-12 w-12">
            <AvatarImage src={post?.user?.profileImage} />
            <AvatarFallback>{post?.user?.name[0]}</AvatarFallback>
          </Avatar>

          <div className="w-full">
            <div className="flex w-full justify-between" onClick={goToProfile}>
              <div className="flex flex-row items-center gap-2">
                <div className="line-clamp-1">
                  <span className="font-semibold cursor-pointer hover:underline">
                    {post?.user?.name}
                  </span>
                </div>
                <div className="line-clamp-1">
                  <span className=" cursor-pointer hidden md:block text-sm dark:text-zinc-400">
                    @{post?.user?.username}
                  </span>
                </div>
                <div className="line-clamp-1">
                  <span className="text-sm dark:text-zinc-500">
                    {createdAt} ago
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-1 text-sm line-clamp-4">{post?.body}</div>

            <div className="flex flex-row items-center mt-3 gap-10">
               
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
