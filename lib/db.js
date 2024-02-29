import {neon, neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";
import { LinksTable, VisitsTable } from './schema'
import { desc, eq, sql as sqld } from "drizzle-orm";
import ramdomShortString from './ramdomShortString'
import * as schema from './schema'


const sql = neon(process.env.DATABASE_URL)
neonConfig.fetchConnectionCache = true;
const db = drizzle(sql, {schema})

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
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "url_index" ON "links" ((LOWER(url)));`   

    await sql`CREATE TABLE IF NOT EXISTS "visits" (
        "id" serial PRIMARY KEY NOT NULL,
        "link_id" integer NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
    );`
    await sql`
    DO $$ BEGIN
     ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;
    `
    // console.log("Db Responce for new Table", dbResponce)
    // try {
    //     await sql`ALTER TABLE "links" ADD COLUMN "short" varchar(50)`        
    // } catch (error) {
    //     console.log("error", error) 
    // }
    
}
configureDatabase().catch(err=>console.log("db config err", err))


export async function addLink(url ) {
    const short =  ramdomShortString()
    const newLink = {url : url, short : short}
    let responce = [{message: `${url} is not valid. please try again`}]
    let responseStatus = 400;
    
    try {
        responce = await db.insert(LinksTable).values(newLink).returning()
        responseStatus = 201;
    } catch ({name, message}) {
        if (`${message}`.includes("duplicate key value violates unique constraint")) {
            responce = [{message: `${url} is already in use. please try again`}]
        }
               
    }
    return {data: responce, status: responseStatus};
}
  

export async function getShortLinkRecord(shortSlugLink ) {   
    return await db.select().from(LinksTable).where(eq(LinksTable.short, shortSlugLink))
}

export async function saveLinkVisit(linkIdValu) {   
    return await db.insert(VisitsTable).values({linkId : linkIdValu})
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
    ).from(LinksTable).limit(lookupLimits).offset(lookupOffset).orderBy(desc(LinksTable.createdAt))
    
}

export async function getMinLinkandVisits(limit, offset) {
    const lookupLimits = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    // return await db.select(
    //     {id: LinksTable.id,
    //     url: LinksTable.url,
    //     timestamp: LinksTable.createdAt,}
    // ).from(LinksTable).limit(lookupLimits).offset(lookupOffset).orderBy(desc(LinksTable.createdAt))
    return await db.query.LinksTable.findMany({
        limit: lookupLimits,
        offset: lookupOffset,
        columns: {
            url: true,
            short: true,
            createdAt: true,
        },
        with: {
            visits: { 
                // limit: 5,
                columns: {
                    createdAt: true,
                },
            },
        },
        extras: {
            // count: sqld`count(${VisitsTable.id})`.as('count')  //TODO check visit count
        },
        orderBy: [desc(LinksTable.createdAt)]
    })
}







