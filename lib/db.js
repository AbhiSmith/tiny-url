import {neon, neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";

import { LinksTable } from './schema'

const sql = neon(process.env.DATABASE_URL)

neonConfig.fetchConnectionCache = true;
const db = drizzle(sql)

// console.log(sql`SELECT NOW()`)


export async function helloWord() {
    const start = new Date()
    const [dbResponce] = await sql`SELECT NOW()`
    const dbNow = dbResponce && dbResponce.now ? dbResponce.now : ""
    // console.log([dbResponce])
    const end = new Date()
    return {dbNow : dbNow,  latency : Math.abs(end - start)}
}


 async function configureDatabase() {    
    const dbResponce = await sql`CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar(50),
        "created_at" timestamp DEFAULT now() NOT NULL
    )`   
    // console.log("Db Responce for new Table", dbResponce)
    // try {
    //     await sql`ALTER TABLE "links" ADD COLUMN "short" varchar(50)`        
    // } catch (error) {
    //     console.log("error", error) 
    // }
    
}
configureDatabase().catch(err=>console.log("db config err", err))


export async function addLink(url ) {
    const newLink = {url : url}
    return await db.insert(LinksTable).values(newLink).returning()
}

export async function getLink(limit, offset) {
    const lookupLimits = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    return await db.select().from(LinksTable).limit(lookupLimits).offset(lookupOffset)
    
}
export async function getMinLink(limit, offset) {
    const lookupLimits = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    return await db.select(
        {id: LinksTable.id,
        url: LinksTable.url,
        timestamp: LinksTable.createdAt,}
    ).from(LinksTable).limit(lookupLimits).offset(lookupOffset)
    
}
