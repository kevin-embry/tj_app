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
        </div>
    )
} 

export default AboutUs;
