import { endSessionForuser } from "@/lib/session"
import { NextResponse } from "next/server"



export const POST = async (req, res) => {
    await endSessionForuser()
    // res.setHeader('Set-Cookie', `cookieName=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);  
    return NextResponse.json({}, {status: 200})
}

// export const GET = async (req, res) => {
//     // Assuming endSessionForuser() is an asynchronous function
//     await endSessionForuser();
    
//     // Clear the cookie by setting it to an empty value and setting its expiration date to a past date
//     res.setHeader('Set-Cookie', `cookieName=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);  
    
//     // Send a response with status code 204 (No Content)
//     res.status(204).end();
// }
