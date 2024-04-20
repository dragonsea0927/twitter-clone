"use client";
import { useInView } from "react-intersection-observer";
import { IInfiniteTweets } from "./types";
import Tweet from "./tweet";

export const InfiniteTweets = ({
  tweets,
  isSuccess,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: {
  tweets: IInfiniteTweets | undefined;
  isSuccess: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any> | void;
  hasNextPage: boolean | undefined;
}) => {
  const { ref } = useInView({
    onChange: (inView) => {
      inView && hasNextPage && fetchNextPage();
    },
  });

  return (
    <div>
      {isSuccess &&
        tweets?.pages?.map((page) => {
          return page?.tweets?.map((tweet, index) =>
            index === page.tweets.length - 1 ? (
              <div ref={ref} key={tweet.id}>
                <Tweet tweet={tweet} />
              </div>
            ) : (
              <div key={tweet.id}>
                <Tweet tweet={tweet} />
              </div>
            )
          );
        })}

      {isFetchingNextPage && <p>Loadding spin...</p>}
    </div>
  );
};
