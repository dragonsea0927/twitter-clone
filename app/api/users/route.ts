import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { currentUser }: any = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    const users = await User.find({ _id: { $ne: currentUser._id } })
      .select("name username _id profileImage email")
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
