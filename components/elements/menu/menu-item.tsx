import { cn } from "@/lib/utils";
import React from "react";

const MenuItem = ({
  onClick,
  children,
  color,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  color?: "red" | "white";
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className={cn(
        "flex items-center gap-3",
        color === "red" && "text-red-100",
        "fill-secondary-100",
        color === "red" && "fill-red-100",
        "[&>svg]:w-h3",
        className
      )}
    >
      {children}
    </button>
  );
};

export default MenuItem;
