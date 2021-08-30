import React, { useState } from 'react';
import APIFetch from './api';


const PostForm =(props)=>
{
    const token=props.token;
    const fetchPosts=props.fetchPosts;
    const setShowCreatePost=props.setShowCreatePost;
    const post=props.post;

    const [title,setTitle]=useState(post ? post.title:"");
    const [description,setDescription]=useState(post ? post.description:"");
    const [price,setPrice]=useState(post ? post.price:"");
    const [location,setLocation]=useState(post ? post.location:"");
    const [willDeliver,setWillDeliver]=useState(post ? post.willDeliver:false);
    const [message,setMessage]=useState("Fill out the form. Title, Description, and Price are required. Location will default to [On Request] if left empty.");
    
    return <form className="PostForm" onSubmit={(event)=>
    {
        event.preventDefault();

        APIFetch(
            {
                url:"posts/"+(post ? post._id:""),
                method:post ? "PATCH":"POST",
                token:token,
                body:
                {
                    post:
                    {
                        title:title,
                        description:description,
                        price:price,
                        location:location ? location:"[On Request]",
                        willDeliver:willDeliver
                    }
                }
            }
        )
        .then((response)=>
        {
            if(response.success)
            {
                setMessage(response.data.message);
                fetchPosts();
                if(!post)
                {
                    setShowCreatePost();
                }
            }
            else
            {
                setMessage(response.error.message);
            }
        })
        
    }}>
        <h2>Post Form:</h2>
        <input required type="text" placeholder="Title" value={title} onChange={(event)=>
        {
            setTitle(event.target.value);
        }}/>
        <br />
        <input required type="text" placeholder="Description" value={description} onChange={(event)=>
        {
            setDescription(event.target.value);
        }}/>
        <br />
        <input required type="text" placeholder="Price" value={price} onChange={(event)=>
        {
            setPrice(event.target.value);
        }}/>
        <br />
        <input type="text" placeholder="Location" value={location} onChange={(event)=>
        {
            setLocation(event.target.value);
        }}/>
        <br />
        <div>
            <input type="checkbox" checked={willDeliver}  onChange={()=>
            {
                setWillDeliver(!willDeliver);
            }}/>
            <label htmlFor="Will Deliver.">Will Deliver.</label>
            </div>

        <p>{message}</p>

        <button type="submit" disabled={!title||!description||!price}>Submit</button>
    </form>
}

export default PostForm;