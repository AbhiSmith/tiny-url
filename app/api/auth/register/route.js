import {registerUser} from "@/lib/db"


export const POST = async (req, res)=> {
    const contentType = await req.headers.get('content-type')
    if (contentType !== 'application/json') {
        return new Response('Invalid: Content-Type must be application/json', {status: 415})
    }
    const data = await req.json()
    const { username, password, passwordConfirm} =  data    
    if (password !== passwordConfirm) {           
        return new Response(JSON.stringify({Invalid: `Passwords do not match try again...`}), {status: 400})
    }
    const isValidData = (username && password)
    if (!isValidData) {        
        return new Response(JSON.stringify({'Invalid': `Username and password are required`}), {status: 400})
    }
    const toSaveData = {
        username: data.username,
        password: data.password,
    }
    if (data.email) { // you have email
        toSaveData["email"] = data.email
    }    
    // console.log(toSaveData)
    const dbResponce = await registerUser(toSaveData)
    const responseData = dbResponce && dbResponce.data ? dbResponce.data : {}
    const responseStatus = dbResponce && dbResponce.status ? dbResponce.status : 500
    
    return new Response(JSON.stringify(responseData), {status: responseStatus})
}