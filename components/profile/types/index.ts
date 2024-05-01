import { IBookmark, ITweet } from "@/components/tweets/types";
import { User, Like } from "@prisma/client";

export interface IUser extends User {
  posts: ITweet[];
  followers: User[];
  following: User[];
  likes: ILike[];
  bookmarks: IBookmark[];
  pinned_tweet: ITweet;
  _count?: {
    followers?: number;
    following?: number;
    posts?: number;
    likes?: number;
  };
}

export interface IProfile {
  name: string;
  bio: string | undefined;
  location: string | undefined;

  banner: {
    url: string | undefined;
    file: File | undefined;
  };
  avatar: {
    url: string | undefined;
    file: File | undefined;
  };
}

export interface ILike extends Like {
  user: IUser;
  tweet: ITweet;
}
