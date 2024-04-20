'use client'
import React from "react";
import { Tabs, TabsList } from "../ui/tabs";
import { usePathname } from "next/navigation";
import NavigationTab from "./navigation-tab";

const FollowersNavigation = () => {

  const pathname = usePathname();
  const id = pathname.split("/")[2] as string;

  return (
    <div>
      <Tabs defaultValue="followers" className="w-full bg-none border-b">
        <TabsList className="w-full justify-evenly">
          <NavigationTab
            text="Followers"
            href={`/profile/${id}/followers`}
            active={pathname === `/profile/${id}/followers`}
          />
          <NavigationTab
            text="Following"
            href={`/profile/${id}/following`}
            active={pathname === `/profile/${id}/following`}
          />
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FollowersNavigation;
