import { notFound, redirect } from "next/navigation";
import { getShortLinkRecord } from "@/lib/db";


export default async function ShortPage({params}) {
    const {short} = params;
    if (!short) {
        notFound()
    }
    const [record] = await getShortLinkRecord(short);
    if (!record) {
        notFound()
    }

    const {url} = record;
    if (!url) {
        notFound()
    }
    redirect(url, "push")
    // return <div>{JSON.stringify(record)}</div>
}