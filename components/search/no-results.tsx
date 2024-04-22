import Link from "next/link";
import React from "react";

const NoResults = ({ query }: { query: string | undefined }) => {
  return (
    <div className="grid place-items-center">
      <div className="w-full max-w-[380px] p-[30px]">
        <span className="text-3xl font-semibold break-words break-all ">No results for &quot;{query}&quot;</span>
        <p className="text-sm text-light-gray ">
          Try searching for something else, or check your Search settings to see
          if they’re protecting you from potentially sensitive content.
        </p>
      </div>
    </div>
  );
};

export default NoResults;
