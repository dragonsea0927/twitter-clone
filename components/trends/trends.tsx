'use client'
import React from "react";
import { useHashtags } from "../explore/hooks/use-hashtag";
import Trend from "./trend";
import LoadingSpinner from "../elements/loading/loading-spinner";

const Trends = () => {
  const { data: hashtags, isError, isLoading } = useHashtags({limit:20});
  return (
    <section aria-label="Trends" className="">
      {isLoading ? (
         <LoadingSpinner/>
      ) : isError ? (
        <div>Error</div>
      ) : hashtags ? (
        <>
          <div>
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
          </div>
           
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default Trends;
