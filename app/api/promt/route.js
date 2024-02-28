import { NextResponse } from 'next/server';

// export async function GET() {
//   return new NextResponse.json({ items: [{ id: 1, title: "Hello Abhi" }] });
// }
export const GET =  async (req, res)=> {
    return new Response(JSON.stringify({
        items: [
            { id: 1, title: "Hello Abhi" },
            { id: 2, title: "Hello Abhi" },
            { id: 3, title: "Hello Abhi" },            
        ] 
    }), {status: 200})
}


// export const POST = async (req, res)=> {
//     return new Response(JSON.stringify({
//         message: "Welcom NEXT Api",
//         name: "Abhishek sing"
//     }), {status: 200})
// }
