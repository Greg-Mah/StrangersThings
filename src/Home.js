import React, { useEffect, useState } from 'react';
import APIFetch from './api';
import Post from './Post';

const Home=(props)=>
{
    const token=props.token;

    const [myMessages,setMyMessages]=useState([]);
    const [myPosts,setMyPosts]=useState([]);
    useEffect(()=>
    {
        if(token)
        {
            Promise.all([APIFetch(
            {
                url:"users/me/",
                token:token
            })])
            .then(([response])=>
            {
                setMyMessages(response.data.messages);
                setMyPosts(response.data.posts)
            })
        }
        else
        {
            setMyMessages([]);
            setMyPosts([]);
        }
    },[token]);

    return <>
    {myMessages.map(()=>
    {
        
    })}
    {myPosts.map((myPost)=>
    {
        <Post key={myPost._id} post={myPost} />
    })}
    </>
}

export default Home;