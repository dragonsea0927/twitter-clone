import { Bookmark, BookmarkActive } from "@/assets/bookmark-icon";
import React from "react";
import { useBookmark } from "../hooks/use-bookmark";
import { ITweet } from "../types";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ post }: { post: ITweet }) => {
  const { data: session }: any = useSession();
  const mutation = useBookmark();

  const toggleBookmark = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    await mutation.mutateAsync({
      tweetId: post?.id,
      userId: session?.currentUser?.id,
    });
  };

  const isBookmark = post?.Bookmarks?.some(
    (bookmark) => bookmark.userId === session?.currentUser?.id
  );

  return (
    <div
      onClick={toggleBookmark}
      className="flex flex-row items-center space-x-1 group cursor-pointer"
    >
      <span
        className={`rounded-full p-2 fill-gray-600 dark:fill-gray-500  group-hover:fill-blue-400 
      transition-colors duration-200 ease-in-out 
      group-hover:bg-blue-400/10
       h-8 w-8
      ${isBookmark ? 'fill-sky-500 dark:fill-sky-500' : ''}
    `}
      >
        {isBookmark ? <BookmarkActive /> : <Bookmark />}
      </span>
    </div>
  );
};

export default BookmarkButton;
