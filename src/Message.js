import React from 'react';


const Message=(props)=>
{
    const message=props.message;
    return <>
        {message.fromUser ? <p>{message.fromUser.username}:{message.content} </p> : null}
    </>;
}

export default Message;