import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || undefined;
  const id = searchParams.get("id") || undefined;

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },

      select: {
        name: true,
        username: true,
        id: true,
        profileImage: true,
        email: true,
        followers: true,
        following: true,
        followersIds: true,
        followingIds: true,
      },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
