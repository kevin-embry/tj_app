import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { useAuth } from './context/auth';

function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();  
    const ref = {...rest}; 

    return(
        <Route 
            {...rest} 
            render={ props => 
                authTokens ? ( 
                    <Component {...rest} /> ) : (     
                    <Redirect to={{
                        pathname: "/login",
                        state: { referer: ref.referer }
                    }} /> )
            }
        />    
    );
}

export default withRouter(PrivateRoute);