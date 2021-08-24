import React, { useState } from 'react';
import APIFetch from './api';


const UserForm =(props)=>
{
    const setToken=props.setToken;
    const setUser=props.setUser;
    const type=props.type;

    
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [message,setMessage]=useState("Enter username and password to "+type+".");
    const [hidden,setHidden]=useState(true);
    


    return <form onSubmit={(event)=>
    {
        event.preventDefault();
        APIFetch(
            {
                url:"users/"+type,
                method:"POST",
                body:
                {
                    user:
                    {
                        username:username,
                        password:password
                    }
                }
            }
        )
        .then((response)=>
        {
            if(response.success)
            {
                setToken(response.data.token);
                setMessage(response.data.message);
                setUser(username);
            }
            else
            {
                setMessage(response.error.message)
            }
        })
        
    }}>
        <h2>{type.toUpperCase()}</h2>
        <input required type="text" placeholder="Username" value={username} onChange={(event)=>
        {
            setUsername(event.target.value);
        }}/>
        <input required type={hidden ? "password": "text"} placeholder="Password" value={password} onChange={(event)=>
        {
            setPassword(event.target.value);
        }}/>
        <input type="checkbox" checked={hidden}  onChange={()=>
        {
            setHidden(!hidden);
        }}/>
        <label htmlFor="Hide Password">Hide Password</label>
        {type==="register" ?
        <input required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event)=>
        {
            setConfirmPassword(event.target.value);
        }}/>
        
        :null}
        
        <p>{message}</p>

        <button type="submit" disabled={!username||!password||(type==="register"&&password!==confirmPassword)}>{type}</button>
    </form>
}

export default UserForm;
