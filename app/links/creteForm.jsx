"use client"

import { useState } from "react"




export default function LinkCreateForm() {
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
    }

    return <>
        <div class="w-full max-w-sm mx-auto mt-4">
        <form onSubmit={handleform}>
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Enter Url to Shorten </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="url" defaultValue="https://github.com/AbhiSmith/tiny-url" type="text" placeholder=" Enter Url to Shorten"/>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Shorten</button>
        </form>
        {result &&   JSON.stringify(result)}
        </div>
         
    </>
}