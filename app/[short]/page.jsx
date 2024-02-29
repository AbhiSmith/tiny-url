import { notFound, redirect } from "next/navigation";
import { getShortLinkRecord } from "@/lib/db";
import getDomain from "@/lib/getDomain";

async function triggerVisit (linkId) {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            linkId:linkId 
        })
    }
    const domain = process.env.NEXT_PUBLIC_VERCEL_URL;
    const endpoint = `${domain}/api/visits/`
    return fetch(endpoint, option)
}


export default async function ShortPage({params}) {
    const {short} = params;
    if (!short) {
        notFound()
    }
    const [record] = await getShortLinkRecord(short);
    if (!record) {
        notFound()
    }

    const {url, id} = record;
    if (!url) {
        notFound()
    }
    if (id) {
        await triggerVisit(id);
    }
    
    redirect(url, "push")
    // return <div>{JSON.stringify(record)}</div>
}