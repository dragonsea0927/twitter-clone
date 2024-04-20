import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const { media } = (await request.json()) as {
    media: {
      tweet_id: string | null;
      message_id: string | null;
      media_url: string;
      media_type: string;
      media_path: string;
    };
  };

  try {
    await prisma.media.create({
      data: {
        ...media,
      },
    });

    return NextResponse.json(
      { message: "Media created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
