"use client";
import React, { useEffect } from "react";
import { useHashtags } from "../explore/hooks/use-hashtag";
import Trend from "./trend";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";

const Trends = ({ limit }: { limit: number }) => {
  const {
    data: hashtags,
    isError,
    isLoading,
    refetch,
  } = useHashtags({ limit, queryKey: ["hashtags"] });

  return (
    <section aria-label="Trends" className="">
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : hashtags ? (
        <>
          {hashtags?.map((hashtag, index) => {
            return (
              <Trend
                key={hashtag.id}
                ranking={index + 1}
                title={hashtag.text}
                tweets={hashtag.score}
              />
            );
          })}
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default Trends;
