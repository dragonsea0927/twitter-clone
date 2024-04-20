import React from "react";

const Trend = ({
  ranking,
  title,
  tweets,
}: {
  ranking: number;
  title: string;
  tweets: number;
}) => {
  return (
    <div
      role="button"
      onClick={() => {}}
      className="px-1 py-2 flex justify-between cursor-pointer"
    >
      <div className="px-3">
        <div className="flex items-center text-sm gap-[0.4rem]">
          <span className="text-light-gray">{ranking}</span> 
          <span className="text-light-gray">Trending</span>
        </div>
        <div className="text-sm">
        #{title}
        </div>
        <div className="flex items-center gap-[0.4rem] text-xs text-light-gray">
            {tweets} {tweets === 1 ? 'tweet' :'tweets'}
        </div>
      </div>
    </div>
  );
};

export default Trend;
