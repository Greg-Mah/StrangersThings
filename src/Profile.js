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
    <h1>My Messages:</h1>
    {myMessages.map((myMessage,idx)=>
    {
        return <>
        <h2 key={idx}>Post:{myMessage.post.title}</h2>
        <Message key={myMessage._id} message={myMessage} />
        </>;
    })}
    <h1>My Posts:</h1>
    {myPosts.map((myPost)=>
    {
        return myPost.active ?<Post key={myPost._id} post={myPost} />:null;
    })}
    </>
}

export default Profile;