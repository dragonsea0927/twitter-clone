import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    const { postId } = route.params;

    const post = await Post.findById(postId)
      .populate({
        path: "user",
        model: User,
        select: "name email profileImage _id username",
      })
      .populate({
        path: "comments",
        model: Comment,
        select: "body _id createdAt ",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "user",
          model: User,
          select: "name username _id profileImage", 
        },
      });

    return NextResponse.json(post);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
