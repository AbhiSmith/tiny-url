// Writeing Sql Statement in JavaScripts Using Drizel

import { relations } from 'drizzle-orm'
import {uniqueIndex, timestamp, text, pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'


export const UsersTable = pgTable('users', {
    id: serial('id').primaryKey().notNull(),
    username: varchar('username', {length: 50}).notNull(),
    password: varchar('password', {length: 75}).notNull(), // never store raw data hash the passwor using salt key
    email: text('email'),
    createdAt: timestamp('created_at').notNull().defaultNow()    
}, (users)=>{
    return {
        usernameIndex: uniqueIndex('username_idx').on(users.username),
    } 
})

// links --> link -> has many visits


export const UsersTableRelations = relations(UsersTable, ({many, one}) => ({
    links: many(LinksTable)
}))

export const LinksTable = pgTable('links', {
    id: serial('id').primaryKey().notNull(),
    url: text('url').notNull(),
    short: varchar('short', {length: 50}),
    userId: integer('user_id').references(()=>UsersTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow()    
})

// links --> link -> has many visits


export const LinksTableRelations = relations(LinksTable, ({many, one}) => ({
    visits: many(VisitsTable),
    user: one(UsersTable, {
        fields: [LinksTable.userId],
        references: [UsersTable.id]  // this is the foreign key in the links table that references the primary key in the users table. This is how we establish a one-to-many relationship between the links table and the users table. The foreign key in the links table is userId and the primary key in
    })
}))

export const VisitsTable = pgTable('visits', {
    id: serial('id').primaryKey().notNull(), 
    linkId: integer('link_id').notNull().references(()=>LinksTable.id),   
    createdAt: timestamp('created_at').notNull().defaultNow()    
})

// visits --> visit -> one link
export const VisitsTableRelations = relations(VisitsTable, ({many, one}) => ({
    link: one(LinksTable, {
        fields: [VisitsTable.linkId],
        references: [LinksTable.id]
    })
}))
