import getDomain from '@/lib/getDomain'
import BlogCard from './card'
import { helloWord } from '@/lib/db'

async function getData() {
 
//   const domain =getDomain();   

  const endpoint = process.env.NEXT_PUBLIC_VERCEL_URL+'/api/promt' // -> third party api service request? 
          
    const res = await fetch(endpoint, {next: {revalidate: 10}})

    // const res = await fetch(endpoint, {cache: "no-cache"}})

    if (!res.ok) {
        throw new Error('Failed to fetch data')    }
    
    if (res.headers.get('content-type').includes('application/json')){
      return {items: []}
    }      
     
    return res.json(); 
    // return {items: []}

}


export default async function Blogpage() {
    const data = await getData();
    const items =  data && data.items ? [...data.items] : [];

    const dbHello = await helloWord();
    // console.log("dbHello: ", dbHello);
    
    return <center>
        <h1>Blog Page</h1>
        <p>DBresponce: {JSON.stringify(dbHello)}</p>
        <p>Post:</p>
        {items.map((item, index) =>{
            return <BlogCard  title={item.title} key={`post-${index}`} />
        })}
    </center>

}


export const runtime = 'edge' //nodejs // adding this latency more faster
export const preferredRegion = 'auto' // asia-south1 // adding this latency more faster



