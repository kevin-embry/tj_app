import React from 'react';
import { ABOUTUS } from '../data/aboutUs';

function AboutUs(props) {
    return (
        <div className="aboutus">
            <h1>About the Thomas Jefferson 618 Association</h1>
            <img id="hatlogo" src="..\..\images\hatlogo.png" alt="Hat Logo"/>
            {ABOUTUS.map((message, index) =>
                <p key={index} >{"   " + message}</p>
            )}
            <h3>This site runs best in Chrome, Firefox or Edge. Sorry, there is no support for Internet Explorer.</h3>
        </div>
    )
} 

export default AboutUs;
