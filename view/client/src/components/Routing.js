import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './LandingPage';
import Footer from './Footer';
import SignUp from '../container/SignUp';
import Signin from '../container/SignIn';
import getUser from '../container/GetUser';


const Routing = () => {
    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/getUser" component={getUser}/>
                </Switch>           
                
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default Routing;