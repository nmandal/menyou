import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '../contexts/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Place from '../pages/Place';
import Places from '../pages/Places';
import Register from '../pages/Register';
import Menu from '../pages/Menu';
import Orders from '../pages/Orders';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <Route exact path='/menu/:id/:table'>
                    <Menu />
                </Route>
                <PrivateRoute exact path='/places/:id'>
                    <Place />
                </PrivateRoute>
                <PrivateRoute exact path='/places'>
                    <Places />
                </PrivateRoute>
                <PrivateRoute exact path='/places/:id/orders'>
                    <Orders />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
        <Toaster />
        </AuthProvider>
    )
}

export default App;