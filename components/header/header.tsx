import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface IHeader extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Header: FC<IHeader> = ({ children, className }) => {
  return (
    <header
    className={cn(
      "sticky py-2 top-0 z-50 z-sticky flex h-[calc(var(--tw-fs-kilo)+22px)] items-center bg-background/90 px-4 font-bold text-secondary-100 backdrop-blur-sm [&amp;>h2]:text-h2 gap-5",
      className,
    )}
  >
      {children}
    </header>
  );
};
