import { AuthOptions } from "next-auth";  
import prisma from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
    
      const isExistingUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!isExistingUser) {
        const newUser = await prisma.user.create({
          data: {
            email: session.user.email,
            name: session.user.name,
            profileImage: session.user.image,
          },
        });

        session.currentUser = newUser;
      }

      session.currentUser = isExistingUser;

      return session;
    },
  },
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET! },
  secret: process.env.NEXTAUTH_SECRET!,
};
