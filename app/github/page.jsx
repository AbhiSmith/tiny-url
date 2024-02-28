"use client"

import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function GithubProfile() {
    const myGithubProfile = 'https://api.github.com/repos/AbhiSmith/tiny-url'
    const { data, error, isLoading } = useSWR(myGithubProfile, fetcher);

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }
    // if (error) {
    //     return <p>Error: {error.message}</p>
    // }

    return (
        <div>
            <center>
            <h1>Github Profile</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <div>
                    <h2>Name: {data.name}</h2>
                    <p>Description: {data.description}</p>
                    <p>Stars: {data.stars}</p>
                    <p>Forks: {data.forks}</p>
                </div>
            )}
            </center>
        </div>        
    )
}