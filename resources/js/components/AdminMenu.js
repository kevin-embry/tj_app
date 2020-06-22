import React from 'react';
import { Link } from 'react-router-dom';

function AdminMenu() {
    return (
        <div className="menu">
            <ul>               
                <li><Link to="/editusers">Edit Users</Link></li>                    
                <li><Link to="/editdecklogs">Edit Deck Logs</Link></li>
                <li><Link to="/editcrew">Edit Crew</Link></li>
                <li><Link to="/editphotos">Edit Photos</Link></li>
                <li><Link to="/edithistory">Edit History</Link></li>
                </ul>
        </div>
    )
}

export default AdminMenu;