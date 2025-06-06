import Link from 'next/link'
import React from 'react'

function HeaderLinks() {

  return (
    <div className='flex flex-col md:flex-row gap-6 mx-5'>
        <Link href="/" className={`text-[#000000] text-md hover:font-semibold`}>Home</Link>
        <Link href="/" className={`text-[#000000] text-md hover:font-semibold`}>Contact</Link>
        <Link href="/login" className={`text-[#000000] text-md hover:font-semibold`}>Admin</Link>
        <Link href="/" className={`text-[#000000] text-md hover:font-semibold`}>Shop</Link>
    </div>
  )
}

export default HeaderLinks