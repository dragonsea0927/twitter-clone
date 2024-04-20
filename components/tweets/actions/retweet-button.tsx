import { RetweetIcon } from "@/assets/retweet-icon";
import { Repeat2 } from "lucide-react";

const RetweetButton = () => {
  return (
    <div className="flex flex-row items-center space-x-1 group">
      <span
        className={` rounded-full p-2 fill-gray-600 dark:fill-gray-500 cursor-pointer   group-hover:fill-green-500 
        transition-colors duration-200 ease-in-out 
        group-hover:bg-green-500/10
         h-8 w-8
      `}
      >
        <RetweetIcon   />
      </span>
    </div>
  );
};

export default RetweetButton;
