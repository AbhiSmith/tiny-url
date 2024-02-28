

export const POST = async (req, res)=> {
    return new Response(JSON.stringify({
        message: "Welcom NEXT Api",
        name: "Abhishek sing"
    }), {status: 200})
}