import React from 'react';
import { useParams } from 'react-router-dom';


const C404=()=>
{
    const params=useParams();
    const url=params[0];
    return <h1>404 Error: Page for {url} does not exist.</h1>
}

export default C404;