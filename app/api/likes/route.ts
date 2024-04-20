import Post from "@/database/post.model";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PUT(req: Request) {
  try {
    const { postId, userId } = (await req.json()) as {
      postId: string;
      userId: string;
    };

    await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: {
          push: userId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId, userId } = (await req.json()) as {
      postId: string;
      userId: string;
    };

    await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: {
        
        },
      },
    });
  
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ erro: result.message }, { status: 400 });
  }
}
