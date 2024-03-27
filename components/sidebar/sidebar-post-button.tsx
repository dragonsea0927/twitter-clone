import { Feather } from "lucide-react";
import Link from "next/link";
import React from "react";

const SidebarPostButton = () => {
  return (
    <Link href={"/"}>
      <div className="relative w-12 h-12 mt-2 rounded-full flex bg-sky-500 items-center justify-center lg:hidden">
        <Feather size={22} color="white" />
      </div>
      <div className="lg:block hidden">
        <div className="border border-blue-400 flex justify-center bg-sky-500 rounded-full text-white py-3">
          <span className="">Tweet</span>
        </div>
      </div>
    </Link>
  );
};

export default SidebarPostButton;
