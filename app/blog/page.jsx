import getDomain from '@/lib/getDomain'

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
    
    return <center>
        <h1>Blog Page</h1>
        <p>Post:</p>
        {items.map((item, index) =>{
            return <li key={`post-${index}`}>{item.title}</li>
        })}
    </center>

}