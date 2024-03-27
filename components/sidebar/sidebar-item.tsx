import { Dot, LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  label: string;
  icon: LucideIcon;
  notification?: boolean;
}
const SidebarItem = ({ label, icon: Icon, notification }: Props) => {
  return (
    <div className="flex flex-row items-center ">
      <div className="relative w-12 h-12 rounded-full flex mt-2  items-center justify-center hover:bg-gray-500 hover:bg-opacity-10 lg:hidden">
        <Icon size={26} />
      </div>
      <div className="relative hidden lg:flex gap-4 py-3 px-4 rounded-full hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={26} />
        <p className="hidden lg:block text-lg font-medium">{label}</p>
        {notification ? (
          <Dot className={"text-sky-500 absolute -top-4 left-0"} size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
