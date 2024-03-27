import Post from "@/database/post.model";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { currentUser }: any = await getServerSession(authOptions);

    const { postId } = await req.json();

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: currentUser._id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { currentUser }: any = await getServerSession(authOptions);
    const { postId } = await req.json();

   await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: currentUser._id },
      },
      { new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ erro: result.message }, { status: 400 });
  }
}
