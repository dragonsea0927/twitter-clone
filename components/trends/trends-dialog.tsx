import React from "react";
import { useHashtags } from "../explore/hooks/use-hashtag";
import Link from "next/link";
import Trend from "./trend";
import LoadingSpinner from "../elements/loading/loading-spinner";

const Trends = () => {
  const { data: hashtags, isError, isLoading } = useHashtags({ limit: 3 });

 

  return (
    <section aria-label="Trends" className="">
      {isLoading ? (
         <LoadingSpinner/>
      ) : isError ? (
        <div>Error</div>
      ) : hashtags ? (
        <>
          <h2 className="text-lg py-3 px-4 font-semibold">Trends</h2>
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

export default Trends;
