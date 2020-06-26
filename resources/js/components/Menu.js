import React from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div className="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>

                    <li className="dropdown">
                        <a className="dropbtn">History</a>
                        <div className="dropdown-content">
                            <Link to="/history/timeline">Timeline</Link>
                            <Link to="/history/timeline">Awards</Link>
                            <Link to="/history/launches">Missle Launches</Link>
                            <Link to="/history/panama">Panama Canal</Link>
                        </div>
                    </li>
                    
                    <li><Link to="/decklogs">Deck Logs</Link></li>                    
                    <li><Link to="/crew">Crew</Link></li>
                    <li><Link to="/comments">Comments</Link></li>
                    <li className="dropdown">
                        <a className="dropbtn">Photos</a>
                        <div className="dropdown-content">
                            <Link to="images">Images</Link>
                            <Link to="/newspapers">Newspapers</Link>
                        </div>
                    </li>
                    <li><Link to="/references">References</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className="dropdown">
                        <a href="#" className="dropbtn">Links</a>
                        <div className="dropdown-content">
                            <a href="http://va.gov" target ="_blank">VA Website</a>
                            <a href="#">Link2</a>
                            <a href="#">Link3</a>
                            <a href="#">Link4</a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
    
}
