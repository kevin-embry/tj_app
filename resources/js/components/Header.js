import React from 'react';
import { useAuth } from '../context/auth';
import LoginContainer from './LoginContainer';
import LogoutContainer from './LogoutContainer';

function Header(props) {
    const user = useAuth();
    // console.log(props);
   
        return (
            <div className="header">
                <img id="dolphins" src="..\..\images\subdolphins.png" title="Dolphins"/>                
                <img id="titlepatch" src="..\..\images\titlepatch_new.png" title="SSN/SSBN 618"/>               
                <img id="tjpatch" src="..\..\images\tjpatch.png" title="Hostility against Tyranny"/>    
                {user.authTokens !== null ? <LogoutContainer adminModeCallback={props.adminModeCallback} />:<LoginContainer/>}
            </div>
        );
}

export default Header;