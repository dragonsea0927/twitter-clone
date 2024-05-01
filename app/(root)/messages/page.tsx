import { Header } from '@/components/header/header'
import React from 'react'

const page = () => {
  return (
    <Header>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-lg font-bold">Messages</h2>
        </div>
      </div>
    </Header>
  )
}

export default page

export const metadata = {
  title: "Messages",
};

