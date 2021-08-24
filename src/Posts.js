import React, {useEffect, useState} from 'react';
import APIFetch from './api';
import NewPostForm from './NewPostForm';
import Post from './Post';

const Posts=(props)=>
{
    const [posts,setPosts]=useState([]);
    const token=props.token;
    const [showCreatePost, setShowCreatePost]=useState(false);

    
    useEffect(()=>
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
    },[])

    return <><h2 onClick={()=>{setShowCreatePost(!showCreatePost)}}>Show/Hide create new post</h2>
    {showCreatePost ? <NewPostForm/>:null}
    {posts.map((post)=>
    {
        return <Post key={post._id} post={post}/>
    })}
    </>
}

export default Posts;