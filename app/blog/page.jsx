import getDomain from '../../lib/getDomain'
// import fetch from 'isomorphic-fetch';

async function getData() {
 
  // const domain =getDomain();   

  // const endpoint = `${domain}/api/promt/` // -> third party api service request? 
  
  //   const res = await fetch(endpoint)
  //   if (!res.ok) {
  //       throw new Error('Failed to fetch data')    }
    
  //   if (res.headers.get('content-type').includes('application/json')){
  //     return {items: []}
  //   }      
     
  //   return res.json(); 
    return {items: []}

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