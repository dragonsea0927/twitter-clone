import React from "react";

const NoBookmarks = () => {
  return (
    <div className="grid place-content-center">
      <div className="max-w-[380px] p-[30px]">
        <span className=" flex text-3xl font-bold">Save Tweets for later</span>
        <span className="text-sm text-light-gray tracking-tight">
          Bookmark posts to easily find them again in the future.
        </span>
      </div>
    </div>
  );
};

export default NoBookmarks;
