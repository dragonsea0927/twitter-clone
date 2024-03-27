import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { body } = await req.json();

    const { currentUser }: any = await getServerSession(authOptions);

    const post = await Post.create({
      body,
      user: currentUser._id,
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

    const userId = searchParams.get("userId");

    const query = userId ? { user: userId } : {};

    const posts = await Post.find(query)
      .populate({
        path: "user",
        model: User,
        select: "name email profileImage _id username",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
