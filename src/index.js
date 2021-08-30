import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Posts from './Posts';
import Account from './Account';
import NavBar from './NavBar';
import Home from './Home';
import Profile from './Profile';
import C404 from './404';
import './style.css';


const App = () => 
{

    const [token,setToken]=useState("");
    const [user,setUser]=useState("");

    return  <BrowserRouter>
        <NavBar user={user} setToken={setToken} setUser={setUser}></NavBar>
        <Switch>
            <Route exact path="/">
                <Home user={user}></Home>
            </Route>
            <Route exact path="/profile/">
                <Profile token={token}></Profile>
            </Route>
            <Route exact path="/posts/">
                <Posts token={token} user={user}></Posts>
            </Route>
            <Route exact path={["/account/*/","/account/"]}>
                <Account setToken={setToken} setUser={setUser}></Account>
            </Route>
            <Route path="/*">
                <C404></C404>
            </Route>
        </Switch>
    </BrowserRouter>
    
}




ReactDOM.render(
  <App />,
  document.getElementById('app'),
);