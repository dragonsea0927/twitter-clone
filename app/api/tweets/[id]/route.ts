import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const tweet = await prisma.post.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        body: true,
        userId: true,
        createdAt: true,
        image: true,
        media: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
            username: true,
          },
        },

        likes: {
          select: {
            userId: true,
          },
        },

        Bookmarks: {
          select: {
            id: true,
            userId: true,
          },
        },

        _count: {
          select: {
            likes: true,
            comments: true,
            Bookmarks:true
          },
        },
      },
    });

    if (!tweet) {
      return NextResponse.json(
        {
          message: "Tweet not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(tweet, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong", error },
      { status: 500 }
    );
  }
}
