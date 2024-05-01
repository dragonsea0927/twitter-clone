import Connect from '@/components/connect/connect'
import ConnectHeader from '@/components/connect/connect-header'
import React from 'react'

const page = () => {
  return (
     <>
        <ConnectHeader/>
        <Connect/>
     </>
  )
}

export default page

export const metadata = {
   title: "Connect",
 };