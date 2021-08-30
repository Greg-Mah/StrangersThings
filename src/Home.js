import React from 'react';

const Home=(props)=>
{
    return <>
        <h1>Welcome to Strangers Things.</h1>
        {props.user ? <h1>{props.user}</h1>:null}
    </>;
}

export default Home;