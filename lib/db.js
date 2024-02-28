import {neon} from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

// console.log(sql`SELECT NOW()`)


export async function helloWord() {
    const start = new Date()
    const [dbResponce] = await sql`SELECT NOW()`
    const dbNow = dbResponce && dbResponce.now ? dbResponce.now : ""
    // console.log([dbResponce])
    const end = new Date()
    return {dbNow : dbNow,  latency : Math.abs(end - start)}
}