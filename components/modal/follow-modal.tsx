"use client";
import React from "react";
import Modal from "../ui/modal";
import useFollowModal from "@/hooks/useFollowModal";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
import { IUser } from "@/types";
import UserItem from "../shared/user-item";

interface Props {
  data: IUser;
}
const FollowModal = ({ data }: Props) => {
  const followModal = useFollowModal();
  const { followers, following } = data || {};

  const bodyContent = (
    <>
      <Tabs defaultValue={followModal.defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
        </TabsList>
        <TabsContent value="following">
          {following && following.length > 0 ? (
            following.map((follower: any) => <UserItem user={follower} key={follower._id} />)
          ) : (
            <p className="w-full text-sm text-center">No following found</p>
          )}
        </TabsContent>
        <TabsContent value="followers">
          {followers && followers.length > 0 ? (
            followers.map((user: any) => <UserItem user={user} key={user._id} />)
          ) : (
            <p className="w-full text-sm text-center">No following found</p>
          )}
        </TabsContent>
      </Tabs>
    </>
  );

  return (
    <Modal
      isOpen={followModal.isOpen}
      onClose={followModal.onClose}
      body={bodyContent}
    />
  );
};

export default FollowModal;
