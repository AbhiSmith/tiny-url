import {pbkdf2Sync} from 'node:crypto'// node:crypto not work on vercel deploy 22:44 29-02-2024 
import pbkdf2 from "./pbkdf2" // we made a function and export it

const saltKey = process.env.SALT_KEY ? process.env.SALT_KEY : 'salt'
const hashIterations = 1000
export const runtime = 'edge' // fro low latency

export function hashPassword(rawPasswordString) {
    const key = pbkdf2Sync(rawPasswordString, saltKey, hashIterations, 64, 'sha512').toString('hex')
    return key.toString("hex") //when need using node:crypto
}
export function comparePassword(enteredRawPassword, storeHash) {    
    const hash = pbkdf2Sync(enteredRawPassword, saltKey, hashIterations, 64, 'sha512').toString('hex')
    return storeHash === hash
}


// for check run command npx tsx lib/passwordUtils.js

// function verifyPasswordWorking() {
//     const password = 'abc123'
//     const hash = hashPassword(password)    
//     const result = comparePassword(password, hash)
//     console.log(result)
// }
// verifyPasswordWorking()