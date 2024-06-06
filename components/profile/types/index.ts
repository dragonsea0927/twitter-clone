import { IBookmark, ITweet } from "@/components/tweets/types";
import { User as PrismaUser, Like } from "@prisma/client";

export interface IUser extends PrismaUser {
  id: string;
  posts: ITweet[];
  followers: PrismaUser[];
  following: PrismaUser[];
  likes: ILike[];
  bookmarks: IBookmark[];
  pinned_tweet: ITweet;
  profileImage: string;
  username: string;
  name: string;
  bio: string;
  location: string;
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
