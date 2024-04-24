import React from "react";
import NavItem from "./navbar-item";
import { Home, HomeActive } from "./assets/home-icon";
import { usePathname } from "next/navigation";
import { Search, SearchActive } from "./assets/search-icon";
import { Bell, BellActive } from "./assets/bell-icon";
import { User, UserActive } from "./assets/user-icon";
import { useSession } from "next-auth/react";
import { Message, MessageActive } from "./assets/message-icon";

const MobileNavbar = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[1];
  const { data: session }: any = useSession();


  return (
    <nav
      className="fixed bottom-0 z-50 bg-background grid w-full grid-flow-col place-items-center border-t sm:hidden"
      aria-label="Primary"
    >
      <NavItem
        href="/"
        icon={pathname === "/" ? <HomeActive /> : <Home />}
        text="Home"
      />
      <NavItem
        href="/explore"
        icon={pathname === "/explore" ? <SearchActive /> : <Search />}
        text="Explore"
      />
      <NavItem
        href="/notifications"
        icon={pathname === "/notifications" ? <BellActive /> : <Bell />}
        text="Notifications"
      />
      <NavItem
          href="/messages"
          icon={pathname === "/messages" ? <MessageActive /> : <Message />}
          text="Messages"
        />
    </nav>
  );
};

export default MobileNavbar;
