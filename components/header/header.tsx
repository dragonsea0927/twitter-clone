import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface IHeader extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Header: FC<IHeader> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "sticky py-2 top-0 z-50 flex items-center bg-background/90 px-4 font-bold text-secondary-100 backdrop-blur-sm gap-5",
        className,
      )}
    >
      {children}
    </header>
  );
};
