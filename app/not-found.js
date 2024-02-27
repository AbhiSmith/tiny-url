import React from 'react'
import Image from 'next/image'


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/404.svg" width={600} height={600} alt="404" />
     
      
    </div>
  )
}

export default NotFound