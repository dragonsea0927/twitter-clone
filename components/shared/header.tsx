"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
interface Props {
  isBack?: boolean;
  label: string;
  tweets?: number;
  subLabel?:boolean
}

const Header = ({ isBack, label, tweets,subLabel }: Props) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <div className="w-full px-5 py-2">
      <div className="flex flex-row items-center gap-4">
        {isBack && (
          <ArrowLeft
            onClick={handleBack}
            size={20}
            className={"cursor-pointer hover:opacity-70 transition"}
          />
        )}
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">{label}</h1>
          {subLabel && (
          <span className="text-xs text-zinc-700 dark:text-zinc-500">{tweets ? `${tweets} Tweets` : '0 Tweets'} </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
