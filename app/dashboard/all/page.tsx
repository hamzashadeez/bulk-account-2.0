import HomeProductSection from '@/components/HomeProductSection'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className="min-h-screen bg-gray-100">

        <HomeProductSection />

        <Link href={"/dashboard"} className='text-center bg-gray-200 my-5 mx-12 md:mx-24 uppercase font-medium text-gray-700 px-4 py-1.5'>Back</Link>
    </div>
  )
}

export default page