import React, { useEffect, useState } from 'react';
import APIFetch from './api';
import Message from './Message';
import Post from './Post';

const Profile = (props)=>
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
    {myMessages.map((myMessage)=>
    {
        return <Message key={myMessage._id} message={myMessage} />;
    })}
    {myPosts.map((myPost)=>
    {
        return <Post key={myPost._id} post={myPost} />;
    })}
    </>
}

export default Profile;