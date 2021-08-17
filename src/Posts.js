import React from 'react';

const Posts=(props)=>
{
    const posts=props.posts;
    const setPosts=props.setPosts;
    console.log(posts);

    return <>{posts.map((post)=>
        {
            return <div key={post.key}>
                {(post.title ? <h2>{post.title}</h2> : null)}
                {(post.author.username ? <p>Seller:{post.author.username}</p> : null)}
                {(post.description ? <p>{post.description}</p> : null)}
                {(post.price ? <p>Price:{post.price}</p> : null)}
                {(post.location ? <p>Location:{post.location}</p> : null)}




            </div>
        })}</>
}

export default Posts;