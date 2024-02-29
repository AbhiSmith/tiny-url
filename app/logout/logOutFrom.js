"use client"
import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";


export default  function LogOut({didSubmit}) {
 const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const JSONData =  JSON.stringify(data)
    try {
      const endPoint = "/api/auth/logout/"
      const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },          
          body: JSONData
      }        
      const response = await fetch(endPoint, options);      
      if (response.status === 200) {
        router.push("/login");   
        // redirect("/");  
        // window.location.href="/"   
      }  
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);    
  }   
  };

  if (loading) {
    return <h1 className="w-full max-w-md  mx-auto mt-4">Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <div className="w-full max-w-md  mx-auto mt-4">
        <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4 text-gray-600">Are you sure want to Logout?</h1>          
           
            <Link href="/"><p className="text-gray-600 hover:text-gray-400 text-md font-bold mb-2">No, go home.</p></Link>
            <button className="bg-gray-600 hover:bg-gray-800  text-gray-800 hover:text-gray-600  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit">Yes, Continue</button>
        </form>            
    </div>
  </>
  )
}
