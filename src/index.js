import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Posts from './Posts';
import { fetchPosts } from './api';

const App = () => 
{
    const [posts,setPosts]=useState([]);
    useEffect(()=>
    {
        Promise.all([fetchPosts()])
        .then(([postsData])=>
        {
            setPosts(postsData);
        });
    },[])
    return <div>
        <Posts posts={posts} setPosts={setPosts}></Posts>
    </div>
}




ReactDOM.render(
  <App />,
  document.getElementById('app'),
);