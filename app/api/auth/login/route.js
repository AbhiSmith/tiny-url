import {getUserByUsername} from "@/lib/db"
import { comparePassword } from "@/lib/passwordUtils"
import { setSessionUser } from "@/lib/session"


export const POST = async (req, res)=> {
    const contentType = await req.headers.get('content-type')
    if (contentType !== 'application/json') {
        return new Response('Invalid: Content-Type must be application/json', {status: 415})
    }
    const data = await req.json()
    const { username, password} =  data    
    
    const isValidData = (username && password)
    if (!isValidData) {        
        return new Response(JSON.stringify({'Invalid': `Username and password are required`}), {status: 400})
    }
    const dbResponce = await getUserByUsername(username)
    const userRecord = dbResponce[0]
    const userRecordId = userRecord?.id    
    const storeUserHash = userRecord?.password
    const isValidPasswordRequest = comparePassword(password, storeUserHash)
    if (!isValidPasswordRequest) { 
        return new Response(JSON.stringify({"message": 'Invalid cred, Please try again'}), {status: 400})
    }  
    await setSessionUser(userRecordId)   
    return new Response(JSON.stringify({}), {status: 200})
}