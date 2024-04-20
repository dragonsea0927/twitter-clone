import React from "react";
import CreateTweet from "@/components/create-tweet/create-tweet";
 
import { Header } from "@/components/header/header";
import { Tweets } from "@/components/tweets/tweets";

const page = () => {
  return (
    <div>
      <Header>
        <span className="p-1">Home</span>
      </Header>
      <CreateTweet />
      <Tweets />
    </div>
  );
};

export default page;
