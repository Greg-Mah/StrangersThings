import React, { useState } from 'react';
import APIFetch from './api';
import PostForm from './PostForm';




const Post=(props)=>
{
    const post=props.post;
    const token=props.token;
    const fetchPosts=props.fetchPosts;

    const [showMessages,setShowMessages]=useState(false);
    const [showEdit,setShowEdit]=useState(false)

    const postAPI=(type,bodyInput,message)=>
    {
        APIFetch({
            url:"post/"+post._id+(message ? "/messages/":"/"),
            method:type,
            token:token,
            ...(bodyInput && {body:bodyInput})
        }
        )
    }

    return <>
        {(post.title ? <h2>{post.title}</h2> : null)}
        {(post.author.username ? <p>Seller: {post.author.username}</p> : null)}
        {(post.description ? <p>{post.description}</p> : null)}
        {(post.price ? <p>Price: {post.price}</p> : null)}
        {(post.location ? <p>Location: {post.location}</p> : null)}
        <p>Will Deliver: {post.willDeliver + post.willDeliver ? "Yes":"No"}</p>
        {(post.createdAt ? <p>Created: {post.createdAt}</p> : null)}
        {(post.updatedAt ? <p>Last updated: {post.updatedAt}</p> : null)}
        {(post.messages.length!==0 ? <p>Messages: {post.messages.length}</p> : null)}
        {post.isAuthor ? <>

        <button onClick={()=>
        {
            setShowEdit(!showEdit);
        }}>Edit</button>
        {showEdit ? <PostForm token={token} fetchPosts={fetchPosts} post={post}/>:null}        
        <button>Delete</button>
        <button onClick={()=>
        {
            setShowMessages(!showMessages);
        }}>Show Post Messages</button>
        </>:null}
        {(showMessages ? post.messages.map((message)=>
        {
            return <Message key={message._id} message={message}/>;
        })
        : null)}
        {!post.isAuthor&&token ? <button>Message</button>:null}

    </>;
}

export default Post;