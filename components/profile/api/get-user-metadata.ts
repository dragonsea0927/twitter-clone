"use server";
import prisma from '@/lib/prismadb'
export const getUserMetadata = async ({
  user_id,
  type,
}: {
  user_id: string;
  type?: string;
}) => {

  try {
    const user = await prisma.user.findUnique({
        where :{
            id:user_id
        },

        include :{
          ...(type === 'tweets' && {
            _count : {
              select :{
                posts : true,
                followers:true,
                following:true
              }
            }
          }),

          ...(type === 'likes' && {
            _count :{
              select:{
                Like:true,
                followers:true,
                following:true,
              }
            }
          }),

          ...(type === 'media' && {
            _count:{
              select:{
                posts:{
                  where:{
                    media:{
                      some:{}
                    }
                  }
                }
              }
            }
          })
        }
        
    })

    return user;
  } catch (error) {
    console.error(error);
    return null;
    
  }
};
