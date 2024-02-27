

async function getData() {
  const endpoint = "http://localhost:3000/api/promt/" // -> third party api service request? 
  
    const res = await fetch(endpoint)
    if (!res.ok) {
        throw new Error('Failed to fetch data')    }
     
    return res.json();
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