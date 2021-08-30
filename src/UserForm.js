import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    
    useEffect(()=>
    {
        if(confirmPassword)
        {
            if(confirmPassword!==password)
            {
                let output="Password match o=matching character, x=wrong character, _=missing character, *=extra character:";
                for(let i=0;i<password.length||i<confirmPassword.length;i++)
                {
                    if(i<password.length)
                    {
                        if(i<confirmPassword.length)
                        {
                            if(password.charAt(i)===confirmPassword.charAt(i))
                            {
                                output+="o";
                            }
                            else
                            {
                                output+="x";
                            }
                        }
                        else
                        {
                            output+="_";
                        }
                    }
                    else
                    {
                        output+="*";
                    }
                }
                setMessage(output);
            }
            else
            {
                setMessage("Passwords match!")
            }
        }
        else
        {
            setMessage("Enter username and password to "+type+".");
        }
    },[confirmPassword])


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
                setMessage(response.error.message);
            }
        })
        
    }}>
        <h2><Link to={"/account/"+type+"/"}>{type.toUpperCase()}</Link></h2>
        <input required type="text" placeholder="Username" value={username} onChange={(event)=>
        {
            setUsername(event.target.value);
        }}/>
        <input required type={hidden ? "password": "text"} placeholder="Password" value={password} onChange={(event)=>
        {
            setPassword(event.target.value);
        }}/>
        <div>
            <input type="checkbox" checked={hidden} value={hidden}  onChange={()=>
            {
                setHidden(!hidden);
            }}/>
            <label htmlFor="Hide Password">Hide Password</label>
        </div>
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
