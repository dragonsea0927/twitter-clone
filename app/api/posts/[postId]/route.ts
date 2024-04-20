import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    const { postId } = route.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id:true,
        body:true,
        createdAt:true,
        userId: true,

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

  
    

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
