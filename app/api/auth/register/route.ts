import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { AwardIcon } from "lucide-react";
import { NextResponse } from "next/server";
import React from "react";
import { hash } from "bcrypt";


export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url); // check const { userId } = req.query;
    const step = searchParams.get("step");

    if (step === "1") {
      const { email } = await req.json(); // check const { name, username, bio, profileImage, coverImage } = req.body;

      const isExistingUser = await User.findOne({ email });
      if (isExistingUser) {
        return NextResponse.json(
          { error: "email already exists" },
          { status: 400 }
        );
      }

      return NextResponse.json({success:true});

    } else if (step === "2") {

        const {email,username,name,password} = await req.json();

        const isExistingUsername = await User.findOne({username});

        if(isExistingUsername){
            return NextResponse.json({error:'Username already taken'},{status:400})
        }
        
        const hashedpassword = await hash(password,10)

        const user  = await User.create({
            email,username,name,password : hashedpassword
        })

        return NextResponse.json({success:true},user)
    }

  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
