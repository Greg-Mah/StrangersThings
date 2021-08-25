import React, { useState } from 'react';


const Post=(props)=>
{
    const post=props.post;

    const [focus,setFocus]=useState();

    return <div onClick={()=>
    {
        setFocus(!focus);
    }}>
        {(post.title ? <h2>{post.title}</h2> : null)}
        {(post.author.username ? <p>Seller: {post.author.username}</p> : null)}
        {(post.description ? <p>{post.description}</p> : null)}
        {(post.price ? <p>Price: {post.price}</p> : null)}
        {(post.location ? <p>Location: {post.location}</p> : null)}
        <p>Will Deliver: {post.willDeliver + post.willDeliver ? "Yes":"No"}</p>
        {(post.createdAt ? <p>Created: {post.createdAt}</p> : null)}
        {(post.updatedAt ? <p>Last updated: {post.updatedAt}</p> : null)}
        {(post.messages.length!==0 ? <p>Messages: {post.messages.length}</p> : null)}
        {(focus ? <>
            {post.isAuthor ? <>
                <button>Delete</button>
                <button>Edit</button>
            </>:null}
            {<button>Message</button>}
            {post.messages.map((message)=>
            {
                return <Message key={message._id} message={message}/>;
            })}
        </>: null)}
    </div>;
}

export default Post;