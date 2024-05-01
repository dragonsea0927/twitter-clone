import React from "react";
import CreateTweet from "@/components/create-tweet/create-tweet";

import { Header } from "@/components/header/header";
import { Tweets } from "@/components/tweets/tweets";
import ProfileButton from "@/components/home/profile-button";

const page = () => {
  return (
    <div>
      <Header>
        <ProfileButton />
        <span className="p-1">Home</span>
      </Header>
      <CreateTweet />
      <Tweets />
    </div>
  );
};

export default page;

export const metadata = {
  title: "Home",
};
