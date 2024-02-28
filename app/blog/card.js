'use client'

import { useState } from "react";



export default function Card({title}){
    const [count, setCount] = useState(1)    

    if (!title) { return <div>Empty</div> }
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    )
}