// Crating a dynamic route

export const GET = async (req,{ params }) => {
   
    const { id } = params;
//    console.log(req)
   
    return new Response(JSON.stringify({Dynamic_urlID: id  }));
}
