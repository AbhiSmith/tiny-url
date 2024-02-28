import React from 'react'
import Image from 'next/image'


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">This is not Valid URL Link</h1>
      
      <Image src="/404.svg" width={600} height={600} alt="404" />
      <button className="bg-black text-white border border-white hover:bg-black hover:text-white hover:border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">
      Refresh
    </button>
      
    </div>
  )
}

export default NotFound