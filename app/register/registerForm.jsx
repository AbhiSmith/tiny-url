"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default  function RegisterForm({didSubmit}) {
 const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    // if (e.target.value !== confirmPassword) {
    //   setPasswordMatch(false);
    // } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (password === confirmPassword) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const JSONData =  JSON.stringify(data)
    try {
      const endPoint = "/api/auth/register/"
      const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },          
          body: JSONData
      }
        
      const response = await fetch(endPoint, options);
        const result = await response.json()
        setResults(result)
      if (response.ok) {
        router.push("/login");}
      // } else {
      //   const error = await response.json();
      //   setResults(data) 
      //   setError(error.message);
      // }
    
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
    else {
      setPasswordMatch(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>

    <div className="w-full max-w-md  mx-auto mt-4">
        <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-4 text-gray-600">Register User</h1>
            
            <label className="block text-gray-600 text-md font-bold mb-2" >Enter Username </label>
            <div className="mb-4 flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="username" type="text" placeholder=" Pick a Username"/>
            </div>
            <label className="block text-gray-600 text-md font-bold mb-2" >Enter Email </label>
            <div className="mb-4 flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="email" type="email" placeholder=" Enter Email"/>
            </div>
            <label className="block text-gray-600 text-md font-bold mb-2" >Enter Password </label>
            <div className="mb-4 flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="password" type="password" placeholder=" Your Password" onChange={handleChangePassword} value={password}/>
            </div>
            <div className=" flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="passwordConfirm" type="password" placeholder=" Confirn your Password" onChange={handleChangeConfirmPassword} value={confirmPassword}/>
            {/* {!passwordMatch && <p>Passwords do not match</p>} */}
            </div>
            {!passwordMatch && <p className="block text-red-800 text-md font-bold mb-4">Passwords do not match</p>}
            <Link href="/login">
            <p className="text-gray-600 hover:text-gray-400 text-md font-bold mb-2">Already have an account? Login</p>
            </Link>
            <button className="bg-gray-600 hover:bg-gray-800  text-gray-800 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit"> Register</button>
        </form> 
        {results && JSON.stringify(results)}       
    </div>
       
    
    </>
  )
}
