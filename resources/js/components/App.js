import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { AuthContext, useAuth } from '../context/auth';
import Authenticate from './Authenticate';
import ForgotPassword from './passwordreset/ForgotPassword';
import Header from './Header';
import Menu from './Menu';
import Welcome from './Welcome';
import Timeline from './history/Timeline'
import Awards from './history/Awards'
import MissleLaunches from './history/MissleLaunches'
import DeckLogs from './decklogs/DeckLogs';
import Crew from './crew/Crew';
import Photos from './photos/Photos';
import VideoModule from './videos/VideoModule';
import AboutUs from './AboutUs';
import Footer from './Footer';
import SignUp from './SignUp';
import UserContainer from './UserContainer';
import EditUsers from './EditUsers';
import UnderConstruction from './UnderConstruction';
import EditAnnouncements from './announcements/EditAnnouncements';


function App(props) {  
    // console.log("APP START");
  
    let history = useHistory();
    
    let existingTokens = JSON.parse(localStorage.getItem("TJUser"));
    existingTokens = (existingTokens !== null) && (existingTokens.expire > new Date() ) ? existingTokens : disableToken(); 
    const [authTokens, setAuthTokens] = useState(existingTokens);
    const [adminMode, setAdminMode] = useState(JSON.parse(localStorage.getItem("TJEditMode")));
    const [newApplicants, setNewApplicants] = useState(getNewApplicants());
    const [newUserNumber, setNewUserNumber] = useState(0);
    const [loading, setLoading] = useState(false);

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

    function disableAdminMode() {
        setAdminMode(false);  
    }

    function toggleAdminMode() {
        localStorage.setItem("TJEditMode", !adminMode);
        setAdminMode(!adminMode);
    }

    function toggleLoading() {
        setLoading(!loading);
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
                    <Header {...props} disableAdminModeCallback={disableAdminMode}/>
                    <Menu {...props} adminMode={adminMode} newUsers={newUserNumber}/>
                    <div className="body">
                        <UserContainer user={authTokens} adminMode={adminMode} adminModeCallback={toggleAdminMode}/>
                        
                        <Switch>
                            {/* PUBLIC ROUTES */}
                            <Route exact path="/" render={(props) => <Welcome {...props} adminMode={adminMode} user={authTokens} />} />
                            <Route path="/login" render={(props) => <Authenticate {...props} />} />
                            <Route path="/signup" render={(props) => <SignUp {...props} />} />
                            <Route path="/about" component={AboutUs} />
                            <Route path="/forgotPassword" component={ForgotPassword} />
                            <Route exact path="/history"><Redirect to="/" /></Route>

                            {/* PRIVATE ROUTES */}
                            {/* <Route exact path="/editusers" render={(props) => <EditUsers {...props} adminMode={adminMode} newUserCallback={getNewApplicants}/>} /> */}
                            <PrivateRoute path="/editusers" referer="/editusers" adminMode={adminMode} newUserCallback={getNewApplicants} component={EditUsers}  />
                          
                            {/* <Route path="/history/timeline" render={(props) => <Timeline {...props} adminMode={adminMode} referer="/history/timeline"/> } /> */}
                            <PrivateRoute path="/history/timeline" referer="/history/timeline" adminMode={adminMode} component={Timeline}  />
                            
                            {/* <Route path="/history/awards" render={(props) => <Awards {...props} adminMode={adminMode} referer="/history/awards"/> } /> */}
                            <PrivateRoute path="/history/awards" referer="/history/awards" adminMode={adminMode} component={Awards}  />

                            {/* <Route path="/history/launches" render={(props) => <MissleLaunches {...props} adminMode={adminMode} referer="/history/misslelaunches"/> } /> */}
                            <PrivateRoute path="/history/launches" referer="/history/launches" adminMode={adminMode} component={MissleLaunches}  />

                            {/* <Route path="/editannouncements" render={(props) => <EditAnnouncements {...props} adminMode={adminMode} />} /> */}
                            <PrivateRoute path="/editannouncements" referer="/editannouncements" adminMode={adminMode} component={EditAnnouncements}  />
                            
                            {/* <Route path="/decklogs" render={(props) => <DeckLogs {...props} adminMode={adminMode} />} /> */}
                            <PrivateRoute path="/decklogs" referer="/decklogs" adminMode={adminMode} component={DeckLogs}  />

                            <PrivateRoute path="/crew" referer="/crew" adminMode={adminMode} component={Crew} />

                            <PrivateRoute path="/videos" referer="/videos" adminMode={adminMode} component={VideoModule} />

                            <PrivateRoute path="/photos/images" referer="/photos/images" adminMode={adminMode} component={Photos}  />

                            {/* CATCH-ALL ROUTE FOR ANYTHING NOT FINISHED IE: UNDER CONSTRUCTION  */}
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
