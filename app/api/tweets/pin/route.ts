import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;

  try {
    const user = await prisma.user
      .findUnique({
        where: {
          id: user_id,
        },
      })
      .pinned_tweet({
        include: {
          user: true,
          media: true,
          likes: true,
          comments: true,
          pinned_by_users:true,

          _count:{
            select:{
              likes:true,
              comments:true
            }
          }
        },
      });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };
  try {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        pinned_tweet_id: tweet_id,
      },
    });

    return NextResponse.json({ message: "Tweet pinned" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error pinning tweet: ${error.message}` }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id } = (await request.json()) as { id: string };

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        pinned_tweet_id: null,
      },
    });

    return NextResponse.json({ message: "Tweet Unpinned" }, { status: 200 });
  } catch (error: any) {

    return NextResponse.json({ error: `Error unpinning tweet: ${error.message}` }, { status: 500 });
  }
}
