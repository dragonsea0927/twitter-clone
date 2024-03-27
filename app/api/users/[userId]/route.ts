import User from "@/database/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { userId: string } }) {
  try {
    const { userId } = route.params;

    const user = await User.findById(userId)
      .populate("following")
      .populate("followers");

    return NextResponse.json(user);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}

export async function PUT(req: Request, route: { params: { userId: string } }) {
  try {
    const body = await req.json();
    const { userId } = route.params;

    
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "updateImage") {

      await User.findByIdAndUpdate(userId, body, { new: true });

    } else if (type === "updateFields") {
      const existUser = await User.findById(userId);

      if (body.username !== existUser.username) {
        const usernameExist = await User.exists({ username: body.username });
        if (usernameExist) {
          return NextResponse.json(
            { error: "Username already exists" },
            { status: 400 }
          );
        }
      }
      await User.findByIdAndUpdate(userId, body, { new: true });

      return NextResponse.json({ message: "User updated successfully" });
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
