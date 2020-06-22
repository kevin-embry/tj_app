import React from 'react';
import { Link } from 'react-router-dom';

function LoginContainer() {

    return (
        <div className="logincontainer">
            <ul>
                <li><Link to={{pathname: "/login", state: {referer: "/"}}} >Login</Link></li>
                <li><p>|</p></li> 
                <li><Link to="/signup">Sign Up</Link></li>                      
            </ul>
        </div>    
    );
     
}

export default LoginContainer;