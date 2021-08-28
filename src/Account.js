import React from "react";
import UserForm from './UserForm';
import { useParams } from 'react-router';
 const Account=(props)=>
{
    const setToken=props.setToken;
    const setUser=props.setUser;
    const params=useParams();
    const type=params[0];
    
    return <>
    {type !== "register/" ? <UserForm setToken={setToken} setUser={setUser} type="login"></UserForm> : null}
    {type !== "login/" ? <UserForm setToken={setToken} setUser={setUser} type="register"></UserForm> : null}
    </>
}

export default Account;