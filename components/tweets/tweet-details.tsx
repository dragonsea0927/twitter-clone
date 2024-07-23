"use client";
import React, { useMemo } from "react";
import { ITweet } from "./types";
import { usePathname } from "next/navigation";
import { useTweet } from "./hooks/use-tweet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import TweetActions from "./tweet-actions";
import CreateTweetWrapper from "../create-tweet/create-tweet-wrapper";
import TweetCreationDate from "./tweet-creation-date";
import Comments from "./comments";
import TweetMedia from "./tweet-media";
import LoadingSpinner from "../elements/loading/loading-spinner";
import Link from "next/link";
import { highlightHashtags } from "./highlight-hashtags";
import TryAgain from "../elements/try-again";
import TweetOwnerMenu from "./options/tweet-owner-menu";
import TweetVisitorMenu from "./options/tweet-visitor-menu";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const TweetDetails = ({
  initialTweet,
}: {
  initialTweet: ITweet | undefined;
}) => {
  const pathname = usePathname();
  const tweetId = pathname.split(`/`)[2];

  const { data: session }: any = useSession();

  const {
    data: tweet,
    isPending,
    isError,
  } = useTweet({
    id: tweetId,
    initialData: initialTweet,
  });

  if (isPending) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
        }}
      >
        <div className="p-4 pb-0 transition relative">
          <div className="flex flex-col space-y-4 w-full ">
            <div className="flex flex-row gap-3">
              <Avatar onClick={() => {}} className="h-9 w-9">
                <AvatarImage
                  src={
                    tweet?.user?.profileImage || `/images/user_placeholder.png`
                  }
                />
              </Avatar>

              <Link className="w-full" href={`/profile/${tweet.user.id}`}>
                <div className="flex flex-col ">
                  <span className="font-semibold text-sm cursor-pointer hover:underline">
                    {tweet?.user?.name}
                  </span>
                  <span className=" cursor-pointer hidden md:block text-sm dark:text-zinc-500">
                    @{tweet?.user?.username}
                  </span>
                </div>
              </Link>

              <div className="">
                {tweet?.user?.id === session?.currentUser?.id ? (
                  <TweetOwnerMenu tweet={tweet} />
                ) : (
                  <TweetVisitorMenu tweet={tweet} />
                )}
              </div>
            </div>

            {tweet?.body && (
              <div className="mt-1 text-sm line-clamp-4">
                {highlightHashtags(tweet?.body)}
              </div>
            )}

            {tweet?.media?.length > 0 && (
              <TweetMedia media={tweet?.media} tweet_id={tweet?.id} />
            )}

            <TweetCreationDate date={tweet?.createdAt} link={tweet?.id} />

            <div className="border-t-[1px] border-b-[1px] py-2 flex flex-row items-center mt-3 justify-around ">
              <TweetActions tweet={tweet} />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
        }}
      >
        <CreateTweetWrapper
          in_reply_to_screen_name={tweet?.user?.username || ""}
          in_reply_to_tweet_id={tweet?.id}
        />
      </motion.div>

      <Comments tweetId={tweet?.id} />
    </>
  );
};

export default TweetDetails;
