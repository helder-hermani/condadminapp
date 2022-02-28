import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import MainPage from './pages/main';
import Home from './pages/home';
import MainPanel from './pages/mainpanel';
import MyUsers from './pages/users';
import NewUser from './pages/users/new';
import EditUser from './pages/users/edit';
import DeleteUser from './pages/users/delete';
import ErrorPage from './pages/error';
import ResetPassword from './pages/resetpassword';

import Testephp from './pages/main/testephp';

export default function Rotas(){
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MainPage}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/mainpanel" exact component={MainPanel}></Route>
            <Route path="/users" exact component={MyUsers}></Route>
            <Route path="/users/new" exact component={NewUser}></Route>
            <Route path="/users/edit/" exact component={EditUser}></Route>
            <Route path="/users/delete/:userindex" exact component={DeleteUser}></Route>
            <Route path="/error/:typemessage" exact component={ErrorPage}></Route>
            <Route path="/resetpassword/:token" exact component={ResetPassword}></Route>

            <Route path="/testephp" exact component={Testephp}></Route>
        </Switch>
    </BrowserRouter>
    )
}