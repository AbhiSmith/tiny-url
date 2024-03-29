
import isValiDURL from "@/lib/isValidURL"
import {addLink} from "@/lib/db"
import { getMinLinkandVisits } from "@/lib/db";

export async function GET(req, res) {    
    const links = await getMinLinkandVisits(100, 0)
    return new Response(JSON.stringify(links), {status: 200})    
}


export const POST = async (req, res)=> {

    // using Standard HTML From
    // const FromData = await req.formData()
    // console.log(FromData)

    const contentType = await req.headers.get('content-type')
    if (contentType !== 'application/json') {
        return new Response('Invalid: Content-Type must be application/json', {status: 415})
    }

    const data = await req.json()
    const url =  data && data.url ? data.url : null
    const isValid = await isValiDURL(url, ["jref.io", process.env.INVALID_URL])
    
    if (!isValid) {
        
        return new Response(JSON.stringify({'Invalid': `<${url}> is not valid`}), {status: 400})
    }
    const dbResponce = await addLink(url)
    const responseData = dbResponce && dbResponce.data ? dbResponce.data : {}
    const responseStatus = dbResponce && dbResponce.status ? dbResponce.status : 500
    
    return new Response(JSON.stringify(responseData), {status: responseStatus})
}