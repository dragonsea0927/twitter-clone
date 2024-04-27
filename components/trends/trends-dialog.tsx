import React, { useEffect } from "react";
import Link from "next/link";
import Trend from "./trend";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";
import { useHashtagsDialog } from "../explore/hooks/use-hashtags-dialog";
import { useHashtags } from "../explore/hooks/use-hashtag";

const TrendsDialog = ({limit}:{limit:number}) => {

  const {
    data: hashtags,
    isError,
    isLoading,
    refetch,
  } = useHashtags({ limit, queryKey: ["hashtags-dialog"] });

  return (
    <section aria-label="Trends" className="">
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : hashtags ? (
        <>
          <h2 className="text-lg py-3 px-4 font-semibold">Trends</h2>

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

          <Link
            className="block p-[1em] cursor-pointer rounded-b-2xl hover:bg-slate-500/10 text-[15px]"
            href={`/trends`}
          >
            <span className="text-sky-500"> Show more</span>
          </Link>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default TrendsDialog;
