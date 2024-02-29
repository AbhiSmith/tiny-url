import Image from "next/image";
import Link from "next/link";

import { getSessionUser } from '@/lib/session'

export default async function Home() {
  const user = await getSessionUser()
  
 
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">        
      <Link href="/links" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Start</Link>  
      {user && <p>Welcome {user}</p>}      
      <Image src="/home1.svg" alt="logo" width={700} height={700} />
    </main>
  );
}
