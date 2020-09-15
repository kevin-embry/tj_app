import React, { useState } from 'react';

class TableLine extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const needsApproval = this.props.user.approved === "false" ? "needsApproval" : "";
        const isSuperAdmin = this.props.user.email === "superadmin@tjhistory.org" ? true : false;
        return (
            <React.Fragment>               
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{this.props.user.lastname}</td>
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{this.props.user.firstname}</td>
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{this.props.user.email}</td>
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{new Date(this.props.user.created_at).toDateString()}</td>          
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{this.props.user.role}</td>
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{this.props.user.approved}</td>
                <td><button 
                        onClick={ () => this.props.editUserCallback(this.props.user)}
                        disabled={isSuperAdmin}
                        title={isSuperAdmin ? "Edit User Disabled For SuperAdmin" : "Edit Euser"}
                    >EDIT USER
                    </button>
                </td>
            </React.Fragment>
        )
    }
}

export default TableLine;