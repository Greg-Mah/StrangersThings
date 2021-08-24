import React from 'react';


const Message=(props)=>
{
    const message=props.message;
    return <>
        {(post.title ? <h3>{post.title}</h3> : null)}
        {(message.fromUser ? <p>{message.fromUser.username}:{message.content} </p> : null)}
    </>;
}

export default Message;