import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

function AdminRoute({ component: Component, ...rest }) {
    const { authTokens } = useAuth();  
    // const ref = {...rest};  

    return(
        <Route 
            {...rest} 
            render={ props => 
                authTokens.role === "admin" ? ( 
                    <Component {...props} /> ) : ( 
                    <Redirect to="/" /> )
            }
        />    
    );
}

export default AdminRoute;