import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const { tweet_id, user_id } = (await request.json()) as {
    tweet_id: string;
    user_id: string;
  };

  try {
    const bookmark = await prisma.bookmarks.findFirst({
      where: {
        userId: user_id,
        postId: tweet_id,
      },
    });

    if (bookmark) {
      await prisma.bookmarks.delete({
        where: {
          id: bookmark.id,
        },
      });

      return NextResponse.json({ message: "Removed bookmark" });
    } else {
      await prisma.bookmarks.create({
        data: {
          userId: user_id,
          postId: tweet_id,
        },
      });
      return NextResponse.json({ message: "Added bookmark" });
    }
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
