"use client";
import { Ellipsis, Heart, Loader2, MessageCircleMore } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IPost } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import useLike from "@/hooks/useLike";

import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { useSession } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

import usePostActionModal from "@/hooks/usePostActionModal";

interface Props {
  post: IPost;
  userId?: string;
}

const PostItem = ({ post, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const postActionModal = usePostActionModal();

  const { data }: any = useSession();
  const currentUser = data?.currentUser;
  const loginModal = useLoginModal();

  const router = useRouter();
  const { hasLiked, toggleLike } = useLike({ post, postId: post?._id, userId });
  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const goToPost = (e: any) => {
    e.stopPropagation();
    router.push(`/posts/${post._id}`);
  };

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, toggleLike, , currentUser]
  );

  const onPostAction = useCallback(
    (e: any) => {
      e.stopPropagation();

      postActionModal.onOpen();
    },
    [postActionModal]
  );

  const goToProfile = useCallback((e: any) => {
    e.stopPropagation();
    router.push(`/profile/${post.user._id}`);
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
        {isLoading && (
          <div className="absolute inset-0 w-full h-full bg-black opacity-50">
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-sky-500" />
            </div>
          </div>
        )}

        <div
          className="flex flex-row gap-3 w-full cursor-pointer"
          onClick={goToPost}
        >
          <Avatar onClick={goToProfile} className="h-12 w-12">
            <AvatarImage src={post?.user?.profileImage}  />
            <AvatarFallback>{post?.user?.name[0]}</AvatarFallback>
          </Avatar>

          <div className="w-full">
            <div className="flex w-full justify-between" onClick={goToProfile}>
              <div className="flex flex-row items-center gap-2">
                <p className=" font-semibold cursor-pointer hover:underline">
                  {post?.user?.name}
                </p>
                <span className=" cursor-pointer hidden md:block">
                  @{post?.user?.username}
                </span>
                <span className=" text-sm">{createdAt} ago</span>
              </div>
            </div>

            <div className="mt-1 text-sm">{post?.body}</div>

            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <MessageCircleMore size={18} />
                <span className="">
                  {Array.isArray(post?.comments) ? post?.comments.length : ""}
                </span>
              </div>

              <div
                className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500`}
                onClick={onLike}
              >
                {hasLiked ? (
                  <>
                    <AiFillHeart size={18} className="text-sky-500" />
                    <span className="text-sky-500">
                      {Array.isArray(post?.likes) ? post.likes.length : ""}
                    </span>
                  </>
                ) : (
                  <>
                    <AiOutlineHeart size={18} />
                    <span className="">{Array.isArray(post?.likes) ? post.likes.length : ""}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
