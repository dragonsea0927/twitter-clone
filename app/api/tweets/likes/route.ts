import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id") || undefined;

  try {
    const tweets = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        likes: true,
      },
    });
    return NextResponse.json(tweets, { status: 200 });
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

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  try {
    const tweet = await prisma.post.findUnique({ where: { id: tweet_id } });

    const like = await prisma.like.findFirst({
      where: {
        postId: tweet_id,
        userId: user_id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      if (tweet && tweet.favorite_count > 0) {
        await prisma.post.update({
          where: {
            id: tweet_id,
          },
          data: {
            favorite_count: {
              decrement: 1,
            },
          },
        });
      }

      return NextResponse.json({ message: "Tweet unliked" });
    } else {
      await prisma.like.create({
        data: {
          postId: tweet_id,
          userId: user_id,
        },
      });

      if (tweet) {
        await prisma.post.update({
          where: {
            id: tweet_id,
          },
          data: {
            favorite_count: {
              increment: 1,
            },
          },
        });
      }

      return NextResponse.json({ message: "Tweet liked" });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
