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
                            <Link to="/history/awards">Awards</Link>
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
                            <Link to="/photos/images">Images</Link>
                            <Link to="/photos/newspapers">Newspapers</Link>
                        </div>
                    </li>
                    <li><Link to="/references">References</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className="dropdown">
                        <a href="#" className="dropbtn">Links</a>
                        <div className="dropdown-content">
                            <a href="http://va.gov" target ="_blank">VA Website</a>
                            <a href="http://www.geocities.ws/ssbn618/" target="_blank">TJ Geocities Site</a>
                            <a href="#">Link3</a>
                            <a href="#">Link4</a>
                        </div>
                    </li>
                    {this.props.adminMode === true? 
                        <li className="buttonWithIndicator">
                            <Link to="/editusers">Edit Users
                            {this.props.newUsers > 0 ? <span className="numberIndicator">{this.props.newUsers}</span> : null}
                            </Link>
                        </li> 
                        : null
                    }    
                    {this.props.adminMode === true? <li><Link to="/editannouncements">Announcements</Link></li> : null}    
                </ul>
            </div>
        );
    }
    
}
