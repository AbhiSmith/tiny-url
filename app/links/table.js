import { getLink } from "@/lib/db";

export default async function LinkHtmlTable() {
    const linkResponce = await getLink();
    // console.log( "Hello",linkResponce);
    return <div className="flex justify-center">
    <div className="w-full max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Link Table</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Url</th>
              <th className="px-4 py-2">Shorten Url</th>
            </tr>
          </thead>
          <tbody>
            {linkResponce && linkResponce.map((link, idx) => (
              <tr key={`link-item-${link.id}-${idx}`} className="border-t">
                <td className="px-4 py-2">{link.id}</td>
                <td className="px-4 py-2">{link.url}</td>
                <td className="px-4 py-2">{link.short}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
}
