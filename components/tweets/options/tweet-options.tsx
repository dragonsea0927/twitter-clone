import { DotIcon } from "@/assets/dot-icon"; 
import React, { useState } from "react";

const TweetOptions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div
        className="flex flex-row items-center space-x-1 group"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(true);
        }}
      >
        <span
          className={`rounded-full p-2 fill-gray-600 dark:fill-gray-500 cursor-pointer group-hover:fill-blue-400 
      transition-colors duration-200 ease-in-out 
      group-hover:bg-blue-400/10
       h-8 w-8
    `}
        >
          <DotIcon />
        </span>
         
      </div>

      {isMenuOpen && (
         <></>
      )}
    </>
  );
};

export default TweetOptions;
