import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { AuthContext, useAuth } from '../context/auth';
import Authenticate from './Authenticate';
import Header from './Header';
import Menu from './Menu';
import Welcome from './Welcome';
import Timeline from './history/Timeline'
import Awards from './history/Awards'
import MissleLaunches from './history/MissleLaunches'
import DeckLogs from './decklogs/DeckLogs';
import Crew from './Crew';
import AboutUs from './AboutUs';
import Footer from './Footer';
import SignUp from './SignUp';
import UserContainer from './UserContainer';
import EditUsers from './EditUsers';
import UnderConstruction from './UnderConstruction';
import EditAnnouncements from './announcements/EditAnnouncements';

function App(props) {  
  
    let history = useHistory();
    
    var existingTokens = JSON.parse(localStorage.getItem("TJUser"));
    existingTokens = (existingTokens !== null) && (existingTokens.expire > new Date() ) ? existingTokens : disableToken(); 
    const [authTokens, setAuthTokens] = useState(existingTokens);
    const [adminMode, setAdminMode] = useState(JSON.parse(localStorage.getItem("TJEditMode")));
    const [newApplicants, setNewApplicants] = useState(getNewApplicants());
    const [newUserNumber, setNewUserNumber] = useState(0);

    //Auth token gets set in promise in authenticate component
    const setTokens = (data) => {
        localStorage.setItem("TJUser", JSON.stringify(data)); 
        setAuthTokens(data);
    }

    function disableToken() {
        localStorage.setItem("TJUser", null);
        localStorage.setItem("TJEditMode", false);  
        return null;
    }

    function toggleAdminMode() {
        localStorage.setItem("TJEditMode", !adminMode);
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
                    <Menu {...props} adminMode={adminMode} newUsers={newUserNumber}/>
                    <div className="body">
                        <UserContainer user={authTokens} adminMode={adminMode} adminModeCallback={toggleAdminMode}/>
                        
                        <Switch>
                            <Route exact path="/" render={(props) => <Welcome {...props} adminMode={adminMode} user={authTokens} />} />
                            <Route path="/login" render={(props) => <Authenticate {...props} />} />
                            <Route path="/signup" render={(props) => <SignUp {...props} />} />
                            <Route path="/about" component={AboutUs} />

                            <Route exact path="/editusers" render={(props) => <EditUsers {...props} adminMode={adminMode} newUserCallback={getNewApplicants}/>} />
                           
                            <Route path="/history/timeline" render={(props) => <Timeline {...props} adminMode={adminMode} referer="/history/timeline"/> } />
                            <Route path="/history/awards" render={(props) => <Awards {...props} adminMode={adminMode} referer="/history/awards"/> } />
                            <Route path="/history/launches" render={(props) => <MissleLaunches {...props} adminMode={adminMode} referer="/history/misslelaunches"/> } />

                            <Route path="/editannouncements" render={(props) => <EditAnnouncements {...props} adminMode={adminMode} />} />
                            
                            <Route path="/decklogs" render={(props) => <DeckLogs {...props} adminMode={adminMode} />} />
                            {/* <PrivateRoute path="/decklogs" referer="/decklogs" component={DeckLogs} /> */}
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
