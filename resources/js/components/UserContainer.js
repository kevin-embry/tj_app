import React, { useState } from 'react';
import { useAuth, AuthContext } from '../context/auth';

function DisplayUser(props) {

    const firstName = props.user !== null ? props.user.firstName : "Guest";

    return (       
        <div className="userContainer">
            {/* <b key={firstName}>Welcome {firstName}</b> */}
            <p key={firstName}>Welcome {firstName}</p>          
        </div>       
    )
}

export default DisplayUser;