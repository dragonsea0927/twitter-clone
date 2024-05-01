import React from "react";

const NoTweetsFound = ({
  username,
  label,
}: {
  username: string | null;
  label?: string;
}) => {
  return (
    <div className="grid place-content-center">
      <div className="max-w-[380px] p-[30px] ">
        <span className="flex text-3xl font-bold justify-center ">
          @{username}
        </span>
        <span className="flex text-3xl font-bold  justify-center ">
          hasn't {label}
        </span>
        <span className="text-sm text-light-gray tracking-tight justify-center">
          When they do, their Tweets will show up here.
        </span>
      </div>
    </div>
  );
};

export default NoTweetsFound;
