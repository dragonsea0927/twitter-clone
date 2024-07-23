
<h1 align="center">Twitter clone</h3>
<p align="center">
This project is a fully functional Twitter clone built using A Next.js 14 with SASS, TailwindCSS, Framer-motion, TypeScript, Tanstack Query, MongoDB, Supabase, Prisma, NextAuth and Zustand. It showcases advanced frontend and backend capabilities.
</p>

<img width="1527" alt="twitter-clone-preview" src="https://tsedxkflgndtkvrmgbug.supabase.co/storage/v1/object/public/images/project_preview.png?t=2024-07-23T09%3A05%3A46.142Z">


## 📽 Demo video link 
https://x.com/imDignesh/status/1784166713694773756

## ✨ Features 

- Google / Github / Email (NextAuth) Authentication 
- Edit profile with profile / banner images and other details
- Create tweet with upto 4 images and support emojis
- Follow / Unfollow user functionality
- User can Likes / Comments / Replies / Bookmark tweet
- User can see following list of other users
- User can Delete / Pin own post 
- User can see other user's following / followers list 
- Search any tweet and user
- Discover trending hashtags
- Fully responsive
- Change theme using shortcut `Alt + T`

## Built with

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Mongodb](https://www.mongodb.com/atlas/database)
- [Supabase](https://supabase.com/docs)
- [Upstash Redis](https://upstash.com/)
- [Zustand](https://zustand.surge.sh/)
- [zod](https://github.com/colinhacks/zod)
- [SWR](https://swr.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SCSS](https://sass-lang.com/)


## 🛠️ Installation 

```bash
git clone https://github.com/devdignesh/twitter-clone.git
cd twitter-clone
npm i
npm run dev
```

## Environment Variables

Before running the development server, make sure to create `.env` file in the root directory of the project and add the required environment variables. You can use the example provided in the repository as a starting point.

```bash
cp .env.example .env
```

## Prisma

This project leverages the power of Prisma ORM for seamless database interaction. Prisma provides a modern database toolkit that simplifies database access, allowing for efficient querying, migrations, and schema management.

Run the following command to generate the Prisma client:

```bash
cp npx prisma generate
```

This command generates TypeScript typings for Prisma Client based on your database schema.

After generating the Prisma client, ensure that any changes made to the database schema are synchronized with the actual database. Run the following command:

```bash
cp npx prisma db push
```

This command applies any pending migrations to the database, ensuring that the local database reflects the latest schema changes made in the codebase.

🔗 Useful Links:
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma GitHub Repository](https://github.com/prisma/prisma)

## Docker Setup
This project includes Docker support for easier development and deployment.

### Prerequisites

- Docker installed on your machine.

### Usage
1. Clone the repository:
```bash
git clone https://github.com/devdignesh/twitter-clone.git
cd twitter-clone
```

2. Pull the latest Docker image:
```bash
docker pull devdignesh/twitter_clone_nextjs:v1.1.0
```

3. Run the Docker container:
```bash
docker run -d -p 8000:3000 devdignesh/twitter_clone_nextjs:v1.1.0
```
4. Access the application in your browser
```bash

http://localhost:8000

```

## Contributing
Welcome to contribute to our repository! We value your input and appreciate any contributions you make


 
