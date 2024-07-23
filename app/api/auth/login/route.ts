import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

const demoUsers = [
  {
    email: process.env.NEXT_PUBLIC_DEMO_USER_ALEX_EMAIL,
  },
  {
    email: process.env.NEXT_PUBLIC_DEMO_USER_TAYLOR_EMAIL,
  },
  {
    email: process.env.NEXT_PUBLIC_DEMO_USER_MORGAN_EMAIL,
  },
];

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();


    const demoUser: any = demoUsers.find((user) => user.email === email);

    if (demoUser) {
      return NextResponse.json({
        success: true,
        email: demoUser.email,
        password: demoUser.password,
      });
    }

    const isExistingUser:any = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (!isExistingUser) {
      return NextResponse.json(
        { error: "Email does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, isExistingUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, user: isExistingUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 500 });
  }
}
