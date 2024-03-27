import { IUser } from "@/types";
import { Bell, Compass, Home, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import SidebarItem from "./sidebar-item";
import SidebarPostButton from "./sidebar-post-button";
import SidebarAccount from "./sidebar-account";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const Sidebar = ({ user }: { user: IUser }) => {
  const SidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      path: `/notifications`,
      icon: Bell,
      notification: false,
      disable:true
    },
    {
      label: "Profile",
      path: `/profile/${user?._id}`,
      icon: User,
    },
    {
      label: "Explore",
      path: "/explore",
      icon: Compass,
    },
  ];

  return (
    <section className="sticky left-0 top-0 h-screen lg:w-[250px] flex flex-col justify-between items-center py-4 px-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center ">
            <div className="relative w-12 h-12 rounded-full flex mt-2  items-center justify-center hover:bg-gray-500 hover:bg-opacity-10 lg:hidden">
            <FaXTwitter size={25} />
            </div>
            <div className="relative hidden lg:flex gap-4 py-3 px-4 rounded-full hover:bg-gray-500 hover:bg-opacity-10 cursor-pointer items-center">
            <FaXTwitter size={25} />
            </div>
          </div>
          <div className="flex flex-col space-y-2 ">
            {SidebarItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <SidebarItem {...item} />
              </Link>
            ))}
          </div>
          <SidebarPostButton />
        </div>
      </div>

      <SidebarAccount user={user} />
    </section>
  );
};

export default Sidebar;
