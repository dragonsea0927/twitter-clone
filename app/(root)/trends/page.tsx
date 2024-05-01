import Trends from '@/components/trends/trends'
import TrendsHeader from '@/components/trends/trends-header'
import React from 'react'

const page = () => {
  return (
    <>
        <TrendsHeader/>
        <Trends limit={15}/>
    </>
  )
}
export default page

export const metadata = {
  title: "Trends",
};