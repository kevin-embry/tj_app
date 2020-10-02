import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import LoginContainer from './LoginContainer';
import LogoutContainer from './LogoutContainer';

function Header(props) {
    const user = useAuth();
    // console.log(props);
   
        return (
            <div className="header">
                <img id="dolphins" src="..\..\images\subdolphins.png" title="Dolphins"/>                
                <Link to="/"><img id="titlepatch" src="..\..\images\titlepatch.png" title="SSN/SSBN 618"/></Link>               
                <img id="tjpatch" src="..\..\images\tjpatch.png" title="Hostility against Tyranny"/>    
                {user.authTokens !== null ? <LogoutContainer disableAdminModeCallback={props.disableAdminModeCallback} />:<LoginContainer/>}
            </div>
        );
}

export default Header;