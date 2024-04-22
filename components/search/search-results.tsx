"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useTweets } from "../tweets/hooks/use-tweets";
import TryAgain from "../elements/try-again";
import LoadingSpinner from "../elements/loading/loading-spinner";
import NoResults from "./no-results";
import { InfiniteTweets } from "../tweets/infinite-tweet";
import { useSearchPeople } from "./hooks/use-search-people";
import PersonDetails from "../connect/person-details";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get("query") || "");

  const {
    data: tweets,
    isError,
    isSuccess,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useTweets({
    queryKey: ["tweets", "query:", query],
    type: "search",
    id: query,
  });

  const { data: people, isSuccess: isSuccessPeople } = useSearchPeople(query);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <>
      {tweets?.pages &&
      tweets?.pages[0]?.tweets.length === 0 &&
      people?.length === 0 ? (
        <NoResults query={query} />
      ) : (
        <div>
          {isSuccessPeople && people.length > 0 && (
            <div className="border-b">
              <span className="py-3 px-4 font-semibold">People</span>
              {people.map((person) => {
                return <PersonDetails key={person.id} author={person} />;
              })}
            </div>
          )}
          <InfiniteTweets
            tweets={tweets}
            isSuccess={isSuccess}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      )}
    </>
  );
};

export default SearchResults;
