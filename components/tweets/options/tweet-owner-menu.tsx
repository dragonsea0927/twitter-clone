import { DotIcon } from "@/assets/dot-icon";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuItem from "@/components/elements/menu/menu-item";
import { PinItem } from "@/assets/pin-icon";
import { TrashIcon } from "@/assets/trash-icon";
import { ITweet } from "../types";
import { usePinnedTweet } from "../hooks/use-pinned-tweet";

import { useSession } from "next-auth/react";
import { useUser } from "@/components/profile/hooks/use-user";
import { HighlightIcon } from "@/assets/highlight-icon";
import { CommentIcon } from "@/assets/comment-icon";
import { EngagementsIcon } from "@/assets/engagements-icon";
import { useDeleteTweet } from "../hooks/use-delete-tweet";
import { usePathname } from "next/navigation";

const TweetOwnerMenu = ({ tweet }: { tweet: ITweet }) => {
  const pinMutation = usePinnedTweet();

  const deleteMutation = useDeleteTweet();

  const { data: session }: any = useSession();
  const { data: user } = useUser({ id: session?.currentUser?.id });

  const deleteTweet = () => {
    try {
      deleteMutation.mutate({
        tweetId: tweet?.id,
        userId: session?.currentUser?.id,
        pinned: tweet.id === user?.pinned_tweet?.id 
      });

      // if (tweet.id === user?.pinned_tweet?.id) {
      //   pinMutation.mutate({
      //     userId: session?.currentUser?.id,
      //     action: "unpin",
      //   });
      // }
     
    } catch (error) {}
  };
  return (
    <>
      <div className="flex flex-row items-center space-x-1 group">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-full border-none focus-visible:border-none hover:border-none focus:border-none fill-gray-600 p-2 dark:fill-gray-500 cursor-pointer group-hover:fill-blue-400 
      transition-colors duration-200 ease-in-out 
      group-hover:bg-blue-400/10 
       h-8 w-8"
          >
            <DotIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={deleteTweet}>
              <MenuItem className="fill-secondary">
                <span className="h-5 w-5 fill-red-500 ">
                  <TrashIcon />
                </span>{" "}
                <span className="text-red-500">Delete</span>
              </MenuItem>
            </DropdownMenuItem>

            {tweet.id === user?.pinned_tweet?.id ? (
              <DropdownMenuItem
                onClick={() => {
                  pinMutation.mutate({
                    userId: session?.currentUser?.id,
                    action: "unpin",
                  });
                }}
              >
                <MenuItem className="fill-secondary">
                  <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600">
                    <PinItem />
                  </span>{" "}
                  <span>Unpin</span>
                </MenuItem>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  pinMutation.mutate({
                    tweetId: tweet.id,
                    userId: session?.currentUser?.id,
                    action: "pin",
                  });
                }}
              >
                <MenuItem className="fill-secondary">
                  <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600">
                    <PinItem />
                  </span>{" "}
                  <span>Pin to your profile</span>
                </MenuItem>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <HighlightIcon />
                </span>{" "}
                <span>Highlight on your profile</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <CommentIcon />
                </span>{" "}
                <span>Change who can reply</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600">
                  <EngagementsIcon />
                </span>{" "}
                <span>View post engagements</span>
              </MenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default TweetOwnerMenu;
