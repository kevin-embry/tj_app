import React from 'react';
import { Link } from 'react-router-dom';

export default class UnderConstruction extends React.Component {

    render(){
        return (
            <div className="underconstruction">
                    <img src="..\..\images\under-construction.png" alt="under-construction"/>
                    <h2>We are building something awesome. Please stay tuned.</h2>    
                    <Link to="/">Take Me Home</Link>
            </div>           
        );
    }    
}
