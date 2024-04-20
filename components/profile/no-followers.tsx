import React from "react";

const NoFollowers = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="grid place-items-center p-7">
      <div className="max-w-[320px]">
        <span className="tracking-wide text-2xl font-bold block">{title}</span>
        <span className="text-light-gray text-sm leading-3">{subtitle}</span>
      </div>
    </div>
  );
};

export default NoFollowers;
