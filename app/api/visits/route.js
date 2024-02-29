import { saveLinkVisit } from "@/lib/db";

export async function POST(req ) {
    const data = await req.json();
    const {linkId} = data;
    const result = await saveLinkVisit(linkId);
    
    return new Response(JSON.stringify(), {status: 200})
}