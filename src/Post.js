import React, { useState } from 'react';
import APIFetch from './api';
import Message from './Message';
import MessageForm from './MessageForm';
import PostForm from './PostForm';




const Post=(props)=>
{
    const post=props.post;
    const token=props.token;
    const fetchPosts=props.fetchPosts;

    const [showMessages,setShowMessages]=useState(false);
    const [showEdit,setShowEdit]=useState(false)


    const deletePost=()=>
    {

        Promise.all([APIFetch(
        {
            url:"posts/"+post._id+"/",
            method:"DELETE",
            token:token,
        })])
        .then(()=>
        {
            fetchPosts();
        });
    }

    return <div className="Post">
        {(post.title ? <h2>{post.title}</h2> : null)}
        {(post.author.username ? <p>Seller: {post.author.username}</p> : null)}
        {(post.description ? <p>{post.description}</p> : null)}
        {(post.price ? <p>Price: {post.price}</p> : null)}
        {(post.location ? <p>Location: {post.location}</p> : <p>Location: [On Request]</p>)}
        <p>Will Deliver: {post.willDeliver ? "Yes":"No"}</p>
        {(post.createdAt ? <p>Created: {post.createdAt}</p> : null)}
        {(post.updatedAt ? <p>Last updated: {post.updatedAt}</p> : null)}
        {(post.messages.length!==0 ? <p>Messages: {post.messages.length}</p> : null)}
        {post.isAuthor ? <>
            <button onClick={()=>
            {
                setShowEdit(!showEdit);
            }}>Edit</button>
            {showEdit ? <PostForm token={token} fetchPosts={fetchPosts} post={post}/>:null}        
            <button onClick={()=>
            {
                deletePost();
            }}>Delete</button>
            <button onClick={()=>
            {
                setShowMessages(!showMessages);
            }}>Show Post Messages</button>
            </>:null
        }
        {!post.isAuthor&&token ? 
            <button onClick={()=>
            {
                setShowMessages(!showMessages);
            }}>Send a message</button>
            :null}
        {showMessages ? (post.isAuthor ? post.messages.map((message)=>
            {
                return <Message key={message._id} message={message}/>;
            })
            : <MessageForm token={token} id={post._id} fetchPosts={fetchPosts}/>)
        : null}

        

    </div>;
}

export default Post;