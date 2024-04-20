import React, { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import TweetActions from "./tweet-actions";
import { ITweet } from "./types";
import TweetMedia from "./tweet-media";
import TweetOptions from "./options/tweet-options";
import { highlightHashtags } from "./highlight-hashtags";

const Tweet = ({ tweet, pinned }: { tweet: ITweet; pinned?: boolean }) => {
  const router = useRouter();

  const goToPost = (e: any) => {
    e.stopPropagation();
    router.push(`/posts/${tweet?.id}`);
  };

  const goToProfile = useCallback((e: any) => {
    e.stopPropagation();
    router.push(`/profile/${tweet.user.id}`);
  }, []);

  const createdAt = useMemo(() => {
    if (!tweet?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(tweet.createdAt));
  }, [tweet?.createdAt]);

  return (
    <>
      <div className="border-b-[1px] px-4 pt-2 pb-2  transition relative">
        <div className="flex flex-row gap-3 w-full  ">
          <Avatar onClick={goToProfile} className="h-9 w-9 cursor-pointer">
            <AvatarImage src={tweet?.user?.profileImage} />
            <AvatarFallback>{tweet?.user?.name[0]}</AvatarFallback>
          </Avatar>

          <div className="w-full">
            <div className="flex w-full">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="line-clamp-1 truncate" onClick={goToProfile}>
                    <span className="font-semibold cursor-pointer text-sm hover:underline">
                      {tweet?.user?.name}
                    </span>
                  </div>
                  <div className="line-clamp-1 truncate">
                    <span className="text-sm text-light-gray">
                      @{tweet?.user?.username}
                    </span>
                  </div>
                  <div className="line-clamp-1 truncate">
                    <span className="text-xs sm:text-sm text-light-gray">
                      · {createdAt} ago
                    </span>
                  </div>
                </div>

                <div className="">
                  <TweetOptions />
                </div>
              </div>
            </div>

            <div onClick={goToPost} className="cursor-pointer">
              {tweet.in_reply_to_tweet_id && (
                <div className="text-sm text-light-gray">
                  <span className="">Replying to</span>
                  <span className="ml-1 text-sky-500">
                    @{tweet.in_reply_to_screen_name}
                  </span>
                </div>
              )}

              {tweet?.body && (
                <div className="mt-1 text-sm line-clamp-4">
                  {highlightHashtags(tweet?.body)}
                </div>
              )}

              {tweet?.media?.length > 0 && (
                <TweetMedia media={tweet?.media} tweet_id={tweet?.id} />
              )}
            </div>

            <div className="flex flex-row items-center mt-3 justify-between">
              <TweetActions tweet={tweet} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
