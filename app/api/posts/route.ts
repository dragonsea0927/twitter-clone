import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { body, userId } = (await req.json()) as {
      body: string;
      userId: string;
    };

    const post = await prisma.post.create({
      data: {
        body,
        userId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || undefined;

    let posts;
    if (userId) {
      posts = await prisma.post.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              profileImage: true,
              id: true,
              username: true,
            },
          },
        },
      });
    } else {
      posts = await prisma.post.findMany({
        select: {
          id:true,
          body:true,
          createdAt:true,
          userId: true,
          image:true,

          user:{
            select:{
              id:true,
              name: true,
              email: true,
              profileImage: true
            }
          },

          likes: {
            select: {
              userId: true,
            },
          },

          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
    }

    return NextResponse.json(posts);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
