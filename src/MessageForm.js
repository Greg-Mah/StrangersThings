import React, { useState } from 'react';
import APIFetch from './api';


const MessageForm=(props)=>
{
    const [content,setContent]=useState("");
    const [note,setNote]=useState("Enter your message above");
    const id=props.id
    const token=props.token;
    const fetchPosts=props.fetchPosts;



    return<form className="MessageForm" onSubmit={(event)=>
        {
            event.preventDefault();
    
            APIFetch(
                {
                    url:"posts/"+id+"/messages/",
                    method:"POST",
                    token:token,
                    body:
                    {
                        message:
                        {
                            content:content
                        }
                    }
                }
            )
            .then((response)=>
            {
                if(response.success)
                {
                    console.log(response);
                    fetchPosts();
                }
                else
                {
                    setNote(response.error.message);
                }
            })
            
        }}> 
        <input type="text" placeholder="Type your message here" value={content} onChange={(event)=>
        {
            setContent(event.target.value);
        }}/>
        <br />
        <p>{note}</p>
        <button type="submit" disabled={!content}>Submit</button>
    </form>;
}

export default MessageForm;