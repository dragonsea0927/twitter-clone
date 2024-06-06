import { IUser } from "../types";

export const following = ({
  user,
  session_owner_id,
}: {
  user: IUser | null;
  session_owner_id: string;
}):boolean => {
  return user
    ? user?.followersIds?.some((follower) => follower === session_owner_id)
    : false;
};
