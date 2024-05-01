import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request, route: { params: { id: string } }) {
  try {
    const { id } = route.params;

    const user = await prisma.user.findUnique({
      where: { id },

      select: {
        id: true,
        name: true,
        username:true,
        email: true,
        profileImage: true,
        coverImage: true,
        createdAt: true,
        bio: true,
        location: true,
        followers: true,
        following: true,
        followersIds:true,
        followingIds:true,
        pinned_tweet_id:true,
        pinned_tweet:true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },      
    });
 
    

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {

  
  const { user_id, name, bio, location, coverImage, profileImage } =
    (await request.json()) as {
      user_id: string;
      name: string;
      bio: string;
      location: string;
      coverImage: string;
      profileImage: string;
    };

 

  try {
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: { 
        name,
        bio,
        location,
        coverImage,
        profileImage,
        
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    
    return NextResponse.json(error.message, { status: 500 });
  }
}
