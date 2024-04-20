import { MessageCircleMore } from "lucide-react";
import React from "react";
import { ITweet } from "../types";
import { CommentIcon } from "@/assets/comment-icon";

const CommentButton = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className="flex flex-row items-center space-x-1 group">
      <span
        className={` rounded-full p-2 fill-gray-600 dark:fill-gray-500 cursor-pointer  group-hover:fill-blue-400 
        transition-colors duration-200 ease-in-out 
        group-hover:bg-blue-400/10
        h-8 w-8
         
      `}
      >
        <CommentIcon />
      </span>

      {tweet?._count?.comments > 0 && (
        <span
          className={`text-sm text-neutral-500 group-hover:fill-blue-400 transition-colors duration-200 ease-in-out `}
        >
          {tweet?._count?.comments}
        </span>
      )}
    </div>
  );
};

export default CommentButton;
