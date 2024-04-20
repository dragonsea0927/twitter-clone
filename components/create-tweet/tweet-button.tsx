import React from 'react'
import Link from "next/link"; 
import { Tweet } from './assets/tweet-icon';

const TweetButton = () => {
  return (
    <Link href={"/"} className="mt-4 max-w-[234px] xxl:w-full">
      <div className="w-full flex justify-center bg-sky-500 rounded-full p-[0.9em] ">
        <span className="flex items-center xxl:hidden h-6 w-6 fill-slate-100 ">
          <Tweet/>
        </span>
        <span className="hidden text-base xxl:inline font-semibold text-white">Post</span>
      </div>
    </Link>
  )
}

export default TweetButton
