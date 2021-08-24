import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Posts from './Posts';
import Account from './Account';
import NavBar from './NavBar';
import Home from './Home';


const App = () => 
{

    const [token,setToken]=useState("");
    const [user,setUser]=useState("");

    return  <BrowserRouter>
        <NavBar user={user} setToken={setToken} setUser={setUser}></NavBar>
        <Switch>
            <Route exact path="/">
                <Home token={token}></Home>
            </Route>
            <Route path="/posts/">
                <Posts token={token} user={user}></Posts>
            </Route>
            <Route path="/(account/:type|account)/">
                <Account setToken={setToken} setUser={setUser}></Account>
            </Route>
        </Switch>
    </BrowserRouter>
    
}




ReactDOM.render(
  <App />,
  document.getElementById('app'),
);