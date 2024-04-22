import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type") || undefined;
  const id = searchParams.get("id") || undefined;

  const cursorQuery = searchParams.get("cursor") || undefined;
  const take = Number(searchParams.get("limit")) || 20;

  const skip = cursorQuery ? 1 : 0;
  const cursor = cursorQuery ? { id: cursorQuery } : undefined;

  try {
    const tweets = await prisma.post.findMany({
      skip,
      take,
      cursor,

      where: {
        ...(type === "comments" && {
          in_reply_to_tweet_id: id,
        }),

        ...(type === "user_tweets" && {
          userId: id,
        }),

        ...(type === "user_replies" && {
          userId: id,
          in_reply_to_tweet_id: { not: null },
        }),

        ...(type === "user_likes" && {
          likes: {
            some: {
              userId: id,
            },
          },
        }),

        ...(type === "user_media" && {
          userId: id,
          media: {
            some: {},
          },
        }),

        ...(type === "bookmarks" && {
          Bookmarks: {
            some: {
              userId: id,
            },
          },
        }),

        ...(type === "search" && {
          body: {
            contains: id,
            mode: "insensitive",
          },
        }),
      },

      include: {
        likes: true,
        comments: true,
        media: true,
        Bookmarks: {
          include: {
            user: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
            username: true,
          },
        },

        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const nextId =
      tweets.length < take ? undefined : tweets[tweets.length - 1].id;

    return NextResponse.json({
      tweets,
      nextId,
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const { tweet } = (await request.json()) as {
    tweet: {
      body: string;
      userId: string;
      in_reply_to_screen_name: string;
      in_reply_to_tweet_id: string;
    };
  };

  try {
    const created_tweet = await prisma.post.create({
      data: {
        ...tweet,
      },
    });

    return NextResponse.json(created_tweet, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: error.errorCode || 500 }
    );
  }
}
