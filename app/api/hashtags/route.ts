import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || undefined;
  try {
    const hashtags = await prisma.hashtag.findMany({
      select: {
        id: true,
        text: true,
        hashtag: true,
        score: true,
        created_at: true,
      },
      take: limit ? parseInt(limit) : undefined,
      orderBy : {
        score :'desc'
      }
    });

    return NextResponse.json(hashtags);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: Request) {
  const { hashtags } = (await request.json()) as { hashtags: string[] };
  try {
    for (const hashtag of hashtags) {
      const hashtagExists = await prisma.hashtag.findUnique({
        where: {
          hashtag: hashtag.toLowerCase(),
        },
      });

      if (hashtagExists) {
        await prisma.hashtag.update({
          where: {
            hashtag: hashtag.toLowerCase(),
          },
          data: {
            score: {
              increment: 1,
            },
          },
        });
      } else {
        await prisma.hashtag.create({
          data: {
            text: hashtag,
            hashtag: hashtag.toLowerCase(),
          },
        });
      }
    }

    return NextResponse.json({ message: "Hashtag created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
