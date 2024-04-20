import { IUser } from "@/types";
import { Bookmarks, Like, Media, Post } from "@prisma/client";

export interface ITweet extends Post {
  likes: ILike[];
  body: string;
  comments: string;
  media: IMedia[];
  Bookmarks: IBookmark[];
  user: IUser;
  id: string;
  hasLiked: boolean;
  _count: {
    likes: number;
    comments: number;
  };
}

export interface ILike extends Like {
  user: IUser;
  tweet: ITweet;
}

export interface IInfiniteTweets {
  pages: { tweets: ITweet[]; nextId?: string | undefined }[];
  pageParams: any;
}

export interface IMedia extends Media {
  tweet: ITweet;
}

export interface IBookmark extends Bookmarks {
  user: IUser;
  tweet: ITweet;
}
