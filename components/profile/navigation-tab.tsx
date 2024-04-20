import Link from "next/link";
import React from "react";
import { TabsTrigger } from "../ui/tabs";

const NavigationTab = ({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active: boolean;
}) => { 
  
  return (
    <Link href={href} className="h-full hover:bg-zinc-500/10 w-full">
      <div className="h-full items-center flex justify-center cursor-pointer">
        <TabsTrigger
          aria-selected={active}
          tabIndex={active ? 0 : -1}
          value={text}
          className={`rounded-none ${active ? 'border-b-sky-500 border-b-[3px] font-semibold  ' : ''}`}
        >
          {text}
        </TabsTrigger>
      </div>
    </Link>
  );
};

export default NavigationTab;
