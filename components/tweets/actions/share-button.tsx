import { ShareIcon } from "@/assets/share-icon";
import { LuShare } from "react-icons/lu";
const ShareButton = () => {
  return (
    <div className="flex flex-row items-center space-x-1 group">
    <span
      className={` rounded-full p-2 fill-gray-600 dark:fill-gray-500  cursor-not-allowed  group-hover:fill-blue-400 
      transition-colors duration-200 ease-in-out 
      group-hover:bg-blue-400/10
       h-8 w-8
    `}
    >
      <ShareIcon   />
    </span>
  </div>
  );
};

export default ShareButton;
