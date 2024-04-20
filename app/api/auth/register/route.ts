 
import { NextResponse } from "next/server"; 
import { hash } from "bcrypt";

import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // check const { userId } = req.query;
    const step = searchParams.get("step");

    if (step === "1") {
      const { email } = await req.json(); // check const { name, username, bio, profileImage, coverImage } = req.body;

      const isExistingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (isExistingUser) {
        return NextResponse.json(
          { error: "email already exists" },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true });
    } else if (step === "2") {
      
      const { email, username, name, password } = await req.json();

      const isExistingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (isExistingUsername) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 }
        );
      }

      const hashedpassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          name,
          password: hashedpassword,
        },
      });

      if (!user) {
        return NextResponse.json({ status: 500 });
      }

      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
