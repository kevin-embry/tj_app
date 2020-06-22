import React from 'react';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';

function LogOutContainer(props) {

    const { setAuthTokens } = useAuth();    
    function logOut(){     
        setAuthTokens(null);
    }    

    return (
        <div className="logincontainer">
            <ul>
                <li><Link to={{pathname: "/", state: {referer: "/"}}} onClick={logOut} >LogOut</Link></li> 
            </ul>
        </div>
    );
}

export default LogOutContainer;