"use client"
import { useState, useEffect } from 'react';

function TableWithFetch() {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data from the API URL
  const fetchData = async () => {
    try {
        const endpoint ='/api/links'
        const options = {
            method: 'GET',
                       
        }
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json()
      console.log(jsonData)
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Table with Fetch</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableWithFetch;
