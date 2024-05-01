import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotIcon } from "@/assets/dot-icon";

import MenuItem from "@/components/elements/menu/menu-item";
import { ITweet } from "../types";
import { EngagementsIcon } from "@/assets/engagements-icon";
import { FollowIcon } from "@/assets/follow-icon";
import { NotInterestedIcon } from "@/assets/not-interested-icon";
import { MuteIcon } from "@/assets/mute-icon";
import { BlockIcon } from "@/assets/block-icon";
import { ReportPostIcon } from "@/assets/report-post";

const TweetVisitorMenu = ({ tweet }: { tweet: ITweet }) => {
  

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
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <NotInterestedIcon />
                </span>{" "}
                <span>Not interested in this post</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <FollowIcon />
                </span>{" "}
                <span>Follow @{tweet.user.username}</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <MuteIcon />
                </span>{" "}
                <span>Mute @{tweet.user.username}</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <BlockIcon />
                </span>{" "}
                <span>Block @{tweet.user.username}</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <EngagementsIcon />
                </span>{" "}
                <span>View post engagements</span>
              </MenuItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MenuItem onClick={() => {}} className="fill-secondary">
                <span className="h-5 w-5 dark:fill-slate-300 fill-zinc-600 ">
                  <ReportPostIcon />
                </span>{" "}
                <span>Report post</span>
              </MenuItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default TweetVisitorMenu;
