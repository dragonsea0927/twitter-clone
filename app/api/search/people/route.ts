import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") as string;

  try {
    const people = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 3,
      include: {
        followers: true,
        
      },
    });

    return NextResponse.json(people,{status:200});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
