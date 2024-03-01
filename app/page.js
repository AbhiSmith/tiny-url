import Image from "next/image";
import Link from "next/link";



import { getSessionUser } from '@/lib/session'

export default async function Home() {
  const user = await getSessionUser()

 
  
  return (
   
    <main className="flex min-h-screen flex-col items-center justify-between p-24">   

       
      {user && <p>Welcome {user}</p>}      
      <Image src="/home1.svg" alt="logo" width={700} height={700} />
    </main>
   
  );
}
