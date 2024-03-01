"use client"

import { useState } from "react"




export default function LinkCreateForm({didSubmit}) {
    const [result, setResult] = useState(null)

    const handleform = async (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        const JsonData = JSON.stringify(data)
        const endpoint = '/api/links'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JsonData
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        // console.log(result)
        setResult(result)
        if (didSubmit) {
            didSubmit(result)
        }
    }

    return <>
        
        <div className="w-full max-w-lg  mx-auto mt-4">
        <form onSubmit={handleform}>
            <label className="block text-gray-600 text-md font-bold mb-2" >Enter Url to Shorten </label>
            <div className="mb-4 flex space-between">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-slate-900" name="url"  type="text" placeholder=" Enter Url to Shorten"/>
            {/* defaultValue="https://github.com/AbhiSmith/tiny-url" */}
            <button className="bg-gray-600 hover:bg-gray-800  text-gray-800 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3" type="submit"> Shorten</button>
            </div>
        </form>
        
        </div>
        <div className="flex justify-center items-center mt-10 ">
            {result && JSON.stringify(result)}
        </div>
       


         
    </>
}