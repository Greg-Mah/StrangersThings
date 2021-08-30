import React, {useEffect, useState} from 'react';
import APIFetch from './api';
import PostForm from './PostForm';
import Post from './Post';


const Posts=(props)=>
{
    const [posts,setPosts]=useState([]);
    const [search,setSearch]=useState("");
    const [matchPosts,setMatchPosts]=useState(posts);   
    const token=props.token;
    const [showCreatePost, setShowCreatePost]=useState(false);

    const fetchPosts=()=>
    {
        Promise.all([APIFetch(
        {
            url:"posts/",
            token:token
        }
        )])
        .then(([response])=>
        {
            setPosts(response.data.posts);
        });
    }

    useEffect(()=>
    {
        fetchPosts();
    },[]);

    useEffect(()=>
    {
        setMatchPosts(posts.filter((post)=>
        {
            return post.title.includes(search)||
            post.description.includes(search)||
            post.author.username.includes(search)||
            post.price.includes(search)||
            post.location.includes(search);
        }));
    },[search,posts]);

    return <>
    <input  type="text" placeholder="Search Posts" value={search} onChange={(event)=>
    {
        setSearch(event.target.value);
    }}/>
    {token ? <h2 onClick={()=>{setShowCreatePost(!showCreatePost)}}>Show/Hide Post form</h2> : null}
    {showCreatePost ? <PostForm token={token} fetchPosts={fetchPosts} setShowCreatePost={setShowCreatePost}/>:null}
    <div>
        {matchPosts.map((post)=>
        {
            return <Post key={post._id} post={post} fetchPosts={fetchPosts} token={token}/>
        })}
    </div>
    </>;
}

export default Posts;