import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { useHistory, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { RestDataSource } from '../webservice/RestDataSource';
import PrivateRoute from '../PrivateRoute';
import { AuthContext, useAuth } from '../context/auth';
import Authenticate from './Authenticate';
import Header from './Header';
import Menu from './Menu';
import AdminMenu from './AdminMenu';
import NewAppMessage from './NewAppMessage';
import Welcome from './Welcome';
import DeckLogs from './DeckLogs';
import Crew from './Crew';
import AboutUs from './AboutUs';
import Footer from './Footer';
import SignUp from './SignUp';
import UserContainer from './UserContainer';
import EditUsers from './EditUsers';
import UnderConstruction from './UnderConstruction';

function App(props) {  
  
    let history = useHistory();
    
    var existingTokens = JSON.parse(localStorage.getItem("TJUser"));
    existingTokens = (existingTokens !== null) && (existingTokens.expire > new Date() ) ? existingTokens : disableToken(); 
    const [authTokens, setAuthTokens] = useState(existingTokens);
    const [adminMode, setAdminMode] = useState(false);
    const [newApplicants, setNewApplicants] = useState(getNewApplicants());
    const [newUserNumber, setNewUserNumber] = useState(0);

    const setTokens = (data) => {
        localStorage.setItem("TJUser", JSON.stringify(data)); 
        setAuthTokens(data);
    }

    function disableToken() {
        localStorage.setItem("TJUser", null); 
        return null;
    }

    function toggleAdminMode() {
        setAdminMode(!adminMode);
    }

    function getNewApplicants() {
        var newApps = [];
        Axios.get('/getNewUsers')
            .then( (response) => {
                newApps.push(response.data);               
                setNewUserNumber(newApps[0].length);
            })
            .catch( (error) => {
                console.log(error);
            })
        return newApps;
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
            <Router history={history}>
                <div className="mainapp">
                    <Header {...props} />
                    {(adminMode === true) ? <AdminMenu newUsers={newUserNumber}/> : ""}
                    <Menu />
                    <div className="body">
                        <UserContainer user={authTokens} adminMode={adminMode} adminModeCallback={toggleAdminMode}/>
                        {(adminMode === true && newUserNumber > 0) ? <NewAppMessage /> : "" }
                        
                        <Switch>
                            <Route exact path="/" render={(props) => <Welcome {...props} adminMode={adminMode} user={authTokens} />} />
                            <Route path="/login" render={(props) => <Authenticate {...props} />} />
                            <Route path="/signup" render={(props) => <SignUp {...props} />} />
                            <Route path="/about" component={AboutUs} />

                            <Route exact path="/editusers" render={(props) => <EditUsers {...props} adminMode={adminMode} newUserCallback={getNewApplicants}/>} />
                            
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
