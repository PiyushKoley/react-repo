import React, { useEffect, useState } from 'react'
import {useLoaderData } from 'react-router-dom';

function Github() {
    // const{githubUsername} = useParams();
    // const [userDetails,setUserDetails] = useState({});

    // useEffect(() => {
    //     fetch(`https://api.github.com/users/${githubUsername}`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //         console.log(res);
    //         setUserDetails(res);
    //     })
    //     .catch((error) => console.log(error))
    // },[]);

    const userDetails = useLoaderData();

  return (
    <div className='text-center text-3xl bg-gray-600 p-4 m-4 text-white'>Github followers : {userDetails.followers}
        <img className=' rounded-full h-36' src={userDetails.avatar_url} alt="github image" />
    </div>
  )
}

export default Github


export const getGithubUserInfo = async () => {

    const response = await fetch('https://api.github.com/users/hiteshChoudhary');

    return response.json();
}