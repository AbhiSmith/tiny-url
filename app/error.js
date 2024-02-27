'use client'
 
export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        className="w-16 h-16 text-red-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v4m0 4v4m-4-4h4m8 0h-4"
        />
      </svg>
      <h2 className="text-xl font-bold mb-4">Something went wrong!--{`${error}`}</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  
  )
}




{/* <center>
<body class="min-h-screen bg-gray-100 flex justify-center items-center">
  <div class="bg-white shadow-md rounded-lg p-8 text-center">
    <h2>Something went wrong!</h2>
    <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      Try again
    </button>
  </div>
</body>
</center> */}