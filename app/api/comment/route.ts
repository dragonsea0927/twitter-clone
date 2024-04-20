import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { body, postId } = await req.json();

    const { currentUser }: any = await getServerSession(authOptions);

    const comment = await Comment.create({
      body,
      user: currentUser._id,
      post: postId,
    });

    await Post.findByIdAndUpdate(postId,{$push:{comments:comment._id}})


    return NextResponse.json(comment);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ erro: result.message }, { status: 400 });
  }
}
