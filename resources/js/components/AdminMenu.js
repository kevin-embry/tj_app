import React from 'react';
import { Link } from 'react-router-dom';

function AdminMenu(props) {
    
    return (
        <div className="menu">
            <ul>               
                <li className="buttonWithIndicator"><Link to="/editusers">Edit Users{props.newUsers > 0 ? <span className="numberIndicator">{props.newUsers}</span> : ""}</Link></li>                    
                <li><Link to="/editdecklogs">Edit Deck Logs</Link></li>
                <li><Link to="/editcrew">Edit Crew</Link></li>
                <li><Link to="/editphotos">Edit Photos</Link></li>
                <li><Link to="/edithistory">Edit History</Link></li>
                </ul>
        </div>
    )
}

export default AdminMenu;