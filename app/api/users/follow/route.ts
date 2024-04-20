import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;
  const type = searchParams.get("type") || undefined;

  try {
    if (type === "followers") {
      const followers = await prisma.user
        .findUnique({
          where: {
            id: user_id,
          },
        })
        .followers();
      return NextResponse.json(followers, { status: 200 });
    } else if (type === "following") {
      const following = await prisma.user
        .findUnique({
          where: {
            id: user_id,
          },
        })
        .following();

      return NextResponse.json(following, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { user_id, session_owner_id } = (await request.json()) as {
    user_id: string;
    session_owner_id: string;
  };

  try {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        followers: {
          connect: {
            id: session_owner_id,
          },
        },
      },
    });

    return NextResponse.json({ message: "Followed" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const user_id = searchParams.get("user_id") || undefined;
  const session_owner_id = searchParams.get("session_owner_id") || undefined;

  try {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        followers: {
          disconnect: {
            id: session_owner_id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Unfollowed",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
