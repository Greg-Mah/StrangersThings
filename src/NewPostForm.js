import React, { useState } from 'react';
import APIFetch from './api';


const NewPostForm =(props)=>
{
    const token=props.token;
    const fetchPosts=props.fetchPosts;
    const setShowCreatePost=props.setShowCreatePost;

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const [location,setLocation]=useState("");
    const [willDeliver,setWillDeliver]=useState(false);
    const [message,setMessage]=useState("Fill out the form. Title, Description, and Price are required. Location will default to [On Request] if left empty.");
    
    const history=useHistory();

    return <form onSubmit={(event)=>
    {
        event.preventDefault();
        if(location==="")
        {
            location="[On Request]";
        }
        APIFetch(
            {
                url:"posts/",
                method:"POST",
                token:token,
                body:
                {
                    post:
                    {
                        title:title,
                        description:description,
                        price:price,
                        location:location,
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
                setShowCreatePost();
            }
            else
            {
                setMessage(response.error.message)
            }
        })
        
    }}>
        <h2>New Post Form:</h2>
        <input required type="text" placeholder="Title" value={title} onChange={(event)=>
        {
            setTitle(event.target.value);
        }}/>
        <input required type="text" placeholder="Description" value={description} onChange={(event)=>
        {
            setDescription(event.target.value);
        }}/>
        <input required type="text" placeholder="Price" value={price} onChange={(event)=>
        {
            setPrice(event.target.value);
        }}/>
        <input type="text" placeholder="Location" value={location} onChange={(event)=>
        {
            setLocation(event.target.value);
        }}/>
        <input type="checkbox" checked={willDeliver}  onChange={()=>
        {
            setWillDeliver(!willDeliver);
        }}/>
        <label htmlFor="Will Deliver.">Will Deliver.</label>
        <p>{message}</p>

        <button type="submit" disabled={!title||!description||!price}>Submit</button>
    </form>
}

export default NewPostForm;