import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props)=>
{
    const user=props.user;
    const setToken=props.setToken;
    const setUser=props.setUser;

    return <h2>
        <NavLink to="/">Home</NavLink>|
        <NavLink to="/posts/">Posts</NavLink>|
        <NavLink to="/account/">Account</NavLink>
        {user? <>|Logged in as {user}|<span onClick={()=>{setToken("");setUser("");}}>Logout</span></>:null}
    </h2>
}

export default NavBar;