import { usePathname } from "next/navigation";
import React from "react";
import Connect from "../connect/connect-dialog";
import Trends from "../trends/trends-dialog";

const Aside = () => {
  const pathname = usePathname();
  return (
    <div className="hidden sticky top-0 px-[1.8rem] h-dvh overflow-y-auto lg:block">
      {pathname !== `/people` && (
        <div className="rounded-2xl dark:bg-slate-500/20 bg-gray-300/30 mt-[15px]">
          <Connect />
        </div>
      )}

      {pathname !== `/exlore` && pathname !== `/trends` && (
        <div className="rounded-2xl dark:bg-slate-500/20 bg-gray-300/30 mt-[15px]">
          <Trends/>
        </div>
      )}
    </div>
  );
};

export default Aside;
