import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import NavItem from "./navbar-item";
import { Home, HomeActive } from "./assets/home-icon";
import { Search, SearchActive } from "./assets/search-icon";
import { Bell, BellActive } from "./assets/bell-icon";
import { Message, MessageActive } from "./assets/message-icon";
import { Bookmark, BookmarkActive } from "./assets/bookmark-icon";
import { User, UserActive } from "./assets/user-icon";

const Navbar = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[1];
  const { data: session }: any = useSession();

  return (
    <div className="flex flex-col items-center  xxl:items-start">
      {session && (
        <NavItem
          href="/"
          icon={pathname === "/" ? <HomeActive /> : <Home />}
          text="Home"
        />
      )}

      <NavItem
        href="/explore"
        icon={pathname === "/explore" ? <SearchActive /> : <Search />}
        text="Explore"
      />

      {session && (
        <NavItem
          href="/notifications"
          icon={
            pathname === "/notifications"
              ? <BellActive/>
              : <Bell/>
          }
          text="Notifications"
        />
      )}

      {session && (
        <NavItem
          href="/messages"
          icon={pathname === "/messages" ? <MessageActive /> : <Message />}
          text="Messages"
        />
      )}

      {session && (
        <NavItem
          href="/bookmarks"
          icon={pathname === "/bookmarks" ? <BookmarkActive /> : <Bookmark />}
          text="Bookmarks"
        />
      )}

      {session && (
        <NavItem
          href={`/profile/${session?.currentUser?.id}`}
          icon={path === "profile" ? <UserActive /> : <User />}
          text="Profile"
        />
      )}
    </div>
  );
};

export default Navbar;
