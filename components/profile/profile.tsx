"use client";

import React from "react";
import { IUser } from "./types";
import { usePathname } from "next/navigation";
import { useUser } from "./hooks/use-user";
import ProfileInfo from "./profile-info";
import ProfileNavigation from "./profile-navigation";
import LoadingSpinner from "../elements/loading/loading-spinner";
import TryAgain from "../elements/try-again";

const Profile = ({ initialUser }: { initialUser: IUser }) => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  const {
    data: user,
    isError,
    status,
    isLoading,
  } = useUser({ id, initialData: initialUser });

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "error" || isError) {
    return <TryAgain />;
  }

  return (
    <>
      <ProfileInfo user={user} id={id} />
      <ProfileNavigation id={id} pathname={pathname} />
    </>
  );
};

export default Profile;
