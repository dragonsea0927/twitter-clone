import React from "react";
import { Header } from "./header";

const NotificationsHeader = () => {
  return (
    <Header>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-lg font-bold">Notifications</h2>
        </div>
      </div>
    </Header>
  );
};

export default NotificationsHeader;
