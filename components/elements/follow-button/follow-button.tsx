import { useFollow } from "@/components/profile/hooks/use-follow";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";

const FollowButton = ({
  user_id,
  username,
  session_owner_id,
  isFollowing = false,
}: {
  username?: string | undefined;
  user_id: string;
  session_owner_id: string;
  isFollowing?: boolean;
}) => {
  const { data: session } = useSession();

  const followMutation = useFollow("follow");
  const unfollowMutation = useFollow("unfollow");

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isFollowing) {
      unfollowMutation.mutate({ user_id, session_owner_id });
    } else {
      followMutation.mutate({ user_id, session_owner_id });
    }
  };

  return (
    <Button
      className={`w-fit ${isFollowing ? "" : "default"}`}
      variant={isFollowing ? "outline" : "default"}
      onClick={(e) => {
        handleFollow(e);
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onMouseEnter={(e) => {
        e.currentTarget.textContent = isFollowing ? "Unfollow" : "Follow";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.textContent = isFollowing ? "Following" : "Follow";
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
