import React, {useEffect, useState} from 'react';
import APIFetch from './api';
import PostForm from './PostForm';
import Post from './Post';


const Posts=(props)=>
{
    const [posts,setPosts]=useState([]);
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
    },[])

    return <>{token ? <h2 onClick={()=>{setShowCreatePost(!showCreatePost)}}>Show/Hide New Post form</h2> : null}
    {showCreatePost ? <PostForm token={token} fetchPosts={fetchPosts} setShowCreatePost={setShowCreatePost}/>:null}
    {posts.map((post)=>
    {
        return <Post key={post._id} post={post} fetchPosts={fetchPosts} token={token}/>
    })}
    </>
}

export default Posts;