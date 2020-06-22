import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import AdminRoute from '../AdminRoute';
import { AuthContext, useAuth } from '../context/auth';
import Authenticate from './Authenticate';
import Header from './Header';
import Menu from './Menu';
import AdminMenu from './AdminMenu';
import Welcome from './Welcome';
import DeckLogs from './DeckLogs';
import Crew from './Crew';
import AboutUs from './AboutUs';
import Footer from './Footer';
import SignUp from './SignUp';
import DisplayUser from './UserContainer';
import UnderConstruction from './UnderConstruction';
import { ABOUTUS } from '../data/aboutUs';



function App(props) {  
  
    // const userObject = useAuth();
    let history = useHistory();
    
    var existingTokens = JSON.parse(localStorage.getItem("TJUser"));
    existingTokens = (existingTokens !== null) && (existingTokens.expire > new Date() ) ? existingTokens : disableToken(); 
    const [authTokens, setAuthTokens] = useState(existingTokens);

    function disableToken() {
        localStorage.setItem("TJUser", null); 
        return null;
    }

    const setTokens = (data) => {
        localStorage.setItem("TJUser", JSON.stringify(data));        
        setAuthTokens(data);
    }

    // console.log("===> ");
    // console.log(authTokens);

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
            <Router history={history}>
                <div className="mainapp">
                    <Header {...props} />
                    <Menu />
                    {(authTokens != null && authTokens.role === 'admin') ? <AdminMenu /> : ""}
                    
                    <div className="body">
                        <DisplayUser user={authTokens}/>
                        <Switch>
                            <Route exact path="/" render={(props) => <Welcome {...props} user={authTokens} />} />
                            <Route path="/login" render={(props) => <Authenticate {...props} />} />
                            <Route path="/signup" render={(props) => <SignUp {...props} />} />
                            <Route path="/about" component={AboutUs} />


                            <PrivateRoute path="/decklogs" referer="/decklogs" component={DeckLogs} />
                            <PrivateRoute path="/crew" referer="/crew" component={Crew} />
                            <Route component={UnderConstruction}/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;

if (document.getElementById('application')) {
    ReactDOM.render(<App />, document.getElementById('application'));
}
