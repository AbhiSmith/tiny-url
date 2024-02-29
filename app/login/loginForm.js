"use client"
import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";


export default  function LoginForm({didSubmit}) {
 const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null)

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const JSONData =  JSON.stringify(data)
    try {
      const endPoint = "/api/auth/login/"
      const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },          
          body: JSONData
      }        
      const response = await fetch(endPoint, options);      
      if (response.ok) {
        router.push("/");   
        // redirect("/");  
        // window.location.href="/"   
      }
      const result = await response.json()        
      setResults(result)
      
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
        <h1 className="text-3xl font-bold mb-4 text-gray-600">Login User</h1>            
            <label className="block text-gray-600 text-md font-bold mb-2" >Enter Username </label>
            <div className="mb-4 flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="username" type="text" placeholder=" Pick a Username"/>
            </div>  
            <label className="block text-gray-600 text-md font-bold mb-2" >Enter Password </label>
            <div className="mb-4 flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="password" type="password" placeholder=" Your Password" />
            </div>  
            <Link href="/register"><p className="text-gray-600 text-md font-bold mb-2">Don&apos;t have account? Create an account</p></Link>
            <button className="bg-gray-600 hover:bg-gray-800  text-gray-800 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit">Login</button>
        </form> 
        {results && JSON.stringify(results)}       
    </div>
  </>
  )
}
