import {neon, neonConfig} from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";
import { LinksTable, VisitsTable, UsersTable } from './schema'
import { desc, eq, sql as sqld } from "drizzle-orm";
import ramdomShortString from './ramdomShortString'
import * as schema from './schema'
import { getSessionUser } from "./session";
import { hashPassword } from "./passwordUtils";


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
     await sql`CREATE TABLE IF NOT EXISTS "links" (
        "id" serial PRIMARY KEY NOT NULL,
        "url" text NOT NULL,
        "short" varchar(50),
        "user_id" integer,
        "created_at" timestamp DEFAULT now()
    );`
    await sql`CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "username" varchar(50) NOT NULL,
        "password" text NOT NULL,
        "email" text,
        "created_at" timestamp DEFAULT now()
    );`
    await sql`CREATE TABLE IF NOT EXISTS "visits" (
        "id" serial PRIMARY KEY NOT NULL,
        "link_id" integer NOT NULL,
        "created_at" timestamp DEFAULT now()
    );`

    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");`
    
    await sql`DO $$ BEGIN
     ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;`

    await sql`DO $$ BEGIN
     ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION
     WHEN duplicate_object THEN null;
    END $$;`
}
configureDatabase().catch(err=>console.log("db config err", err))


export async function addLink(url) {
    const short = ramdomShortString()
    const user = await getSessionUser()
    const newLink = {url: url, short:short}
    if (user) {
        newLink["userId"] = user
    }
    let response= {message: `${url} is not valid. Please try again`}
    let responseStatus = 400
    try {
        response = await db.insert(LinksTable).values(newLink).returning()
        responseStatus = 201
    } catch ({name, message}) {
        if (`${message}`.includes("duplicate key value violates unique constraint")) {
            response ={message: `${url} is has already been added.`}
        }
    }
    return {data: response, status: responseStatus}
}

export async function registerUser(newUserData) {
        
    const {username} = newUserData
    const toInsertdata = {
        username: newUserData.username,
        password: hashPassword(newUserData.password),        
    }
    if (newUserData.email) { // you have email
        toInsertdata["email"] = newUserData.email
    }
   
    let response = {message: "User is not valid. Please try again"}  
    let responseStatus = 400
    try {
        let dbResponce = await db.insert(UsersTable).values(toInsertdata).returning()
        let UserData = dbResponce[0]
        response = [{
            id: UserData.id,
            username: UserData.username,
            createdAt: UserData.createdAt,
        }]
        responseStatus = 201
    } catch ({name, message}) {
        if (`${message}`.includes("duplicate key value violates unique constraint")) {
            response ={message: `${username} is has already taken.`}
        }
    } 
    return {data: response, status: responseStatus}
   
}

export async function getUserByUsername(username) {
    return await db.select().from(UsersTable).where(eq(UsersTable.username, username))
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
    const sessionUser = await getSessionUser()
    return await db.select(
        {id: LinksTable.id,
        url: LinksTable.url,
        timestamp: LinksTable.createdAt,}
    ).from(LinksTable).limit(lookupLimits).offset(lookupOffset).orderBy(desc(LinksTable.createdAt)).where(eq(LinksTable.userId, sessionUser))
    
}

export async function getMinLinkandVisits(limit, offset) {
    const lookupLimits = limit ? limit : 10
    const lookupOffset = offset ? offset : 0
    const sessionUser = await getSessionUser()
    // return await db.select(
    //     {id: LinksTable.id,
    //     url: LinksTable.url,
    //     timestamp: LinksTable.createdAt,}
    // ).from(LinksTable).limit(lookupLimits).offset(lookupOffset).orderBy(desc(LinksTable.createdAt))
    return await db.query.LinksTable.findMany({
        limit: lookupLimits,
        offset: lookupOffset,
        orderBy: [desc(LinksTable.createdAt)],
        columns: {
            url: true,
            short: true,
            createdAt: true,
            userId: true,
        },
        where: eq(LinksTable.userId, sessionUser),
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
        
    })
}







