import React from "react";
import UserForm from './UserForm';
import { useParams } from 'react-router';
 const Account=(props)=>
{
    const setToken=props.setToken;
    const setUser=props.setUser;
    const params=useParams();
    return <>
    {params.type !== "register" ? <UserForm setToken={setToken} setUser={setUser} type="login"></UserForm> : null}
    {params.type !== "login" ? <UserForm setToken={setToken} setUser={setUser} type="register"></UserForm> : null}
    </>
}

export default Account;