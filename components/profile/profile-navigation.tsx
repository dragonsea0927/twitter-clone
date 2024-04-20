import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import NavigationTab from "./navigation-tab";
import { tabs } from "./utils/tabs-data";

const ProfileNavigation = ({
  id,
  pathname,
}: {
  id: string;
  pathname: string;
}) => {
   

  return (
    <div className="mt-4">
      <Tabs defaultValue="Tweets" className="w-full bg-none border-b shadow-none">
        <TabsList className="w-full justify-evenly">
          {tabs(id).map((tab, index) => (
            <NavigationTab
              key={index}
              text={tab.text}
              href={tab.href}
              active={pathname === tab.href}
            />
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ProfileNavigation;
