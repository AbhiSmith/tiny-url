"use client"
import useSWR from "swr";
import LinkCreateForm from "./creteForm"
import Link from "next/link";
// import { getLink } from "@/lib/db";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LinkHtmlTable() {
    const endPoint = "/api/links";
    const { data, error, isLoading, mutate } = useSWR(endPoint, fetcher); //{refreshInterval: 2000} add if want
    if (error) return <div>failed to load</div>;
    if (isLoading) <center><h1>Loading....</h1></center>

    const didSubmit = (newItem) => {
        mutate()
    }
    
    return <>
    < LinkCreateForm  didSubmit={didSubmit}/>
    <div className="flex justify-center">
    <div className="w-full max-w-3xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-600">Link Table</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-900 text-gray-500">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Url</th>
              <th className="px-4 py-2">Shorten Url</th>
              
            </tr>
          </thead>
          <tbody>
            {data && data.map((link, idx) => (
              <tr key={`link-item-${link.id}-${idx}`} className="border-t text-gray-300">
                <td className="px-4 py-2">{link.id}</td>
                <td className="px-4 py-2">{link.url}</td>
                <td className="px-4 py-2"><Link href={link.short}>https://tiny-url-liard.vercel.app/{link.short}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    </>
}

// This directily call from databases
// export default async function LinkHtmlTable() {
//     // const linkResponce = await getLink();
//     // console.log( "Hello",linkResponce);
//     return <div className="flex justify-center">
//     <div className="w-full max-w-3xl">
//       <h1 className="text-3xl font-bold mb-4">Link Table</h1>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-900">
//               <th className="px-4 py-2">Id</th>
//               <th className="px-4 py-2">Url</th>
//               <th className="px-4 py-2">Shorten Url</th>
//             </tr>
//           </thead>
//           <tbody>
//             {linkResponce && linkResponce.map((link, idx) => (
//               <tr key={`link-item-${link.id}-${idx}`} className="border-t">
//                 <td className="px-4 py-2">{link.id}</td>
//                 <td className="px-4 py-2">{link.url}</td>
//                 <td className="px-4 py-2">{link.short}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
  
// }
