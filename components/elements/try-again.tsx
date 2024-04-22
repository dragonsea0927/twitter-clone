'use client'
import { ReloadIcon } from '@/assets/reload-icon';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from '../ui/button';

const TryAgain = () => {
    const router = useRouter();

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <h2 className='text-center text-sm'>Something went wrong. Try reloading.</h2>
      <Button onClick={() => router.refresh()} className='w-fit text-sm space-x-2 bg-sky-500 text-white'>
        <span className='flex fill-slate-100 h-[19px] w-[19px] '>
          <ReloadIcon />
        </span>
        <span className='text-sm'>Retry</span>
      </Button>
    </div>
  )
}

export default TryAgain
