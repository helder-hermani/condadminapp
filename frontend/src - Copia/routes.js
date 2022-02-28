import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import MainPage from './pages/main';
import Home from './pages/home';
import MainPanel from './pages/mainpanel';
import NewUser from './pages/users/newuser';
import Testephp from './pages/main/testephp';

export default function Rotas(){
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MainPage}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/mainpanel" exact component={MainPanel}></Route>
            <Route path="/newuser" exact component={NewUser}></Route>
            <Route path="/testephp" exact component={Testephp}></Route>
        </Switch>
    </BrowserRouter>
    )
}