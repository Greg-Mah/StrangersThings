import React from 'react';


const Post=(props)=>
{
    const post=props.post;
    return <>
        {(post.title ? <h2>{post.title}</h2> : null)}
        {(post.author.username ? <p>Seller:{post.author.username}</p> : null)}
        {(post.description ? <p>{post.description}</p> : null)}
        {(post.price ? <p>Price:{post.price}</p> : null)}
        {(post.location ? <p>Location:{post.location}</p> : null)}
        {(post.createdAt ? <p>Created:{post.createdAt}</p> : null)}
        {(post.updatedAt ? <p>Last updated:{post.updatedAt}</p> : null)}
        {(post.messages.length!==0 ? <p>Messages:{post.messages.length}</p> : null)}
    </>;
}

export default Post;