import prisma from "@/lib/prismadb";
export const getTweetMetadata = async ({ tweet_id }: { tweet_id: string }) => {
  try {
    const tweet = await prisma.post.findUnique({
      where: {
        id: tweet_id,
      },
      select: {
        id: true,
        body: true,
        createdAt: true,
        userId: true,
        image: true,
        media :true,
        
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
            username:true
          },
        },

        likes: {
          select: {
            userId: true,
          },
        },

        Bookmarks:{
          select:{
              id:true,
              userId:true
          }
        },

        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return tweet;
  } catch (error) {}
};
