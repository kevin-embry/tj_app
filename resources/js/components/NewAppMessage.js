import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// THIS COMPONENT TO BE REMOVED!!!!

function NewAppMessage() {

    const [visibility,setVisibility] = useState('visible');

    function redirectToEdit() {       
        setVisibility('hide');
    }

    return (
        <div className="newAppMessage">
            <p className={visibility}>You have new applicants to the site. Click <Link to="/editusers" onClick={redirectToEdit}>HERE</Link></p>
        </div>
    )
}

export default NewAppMessage;