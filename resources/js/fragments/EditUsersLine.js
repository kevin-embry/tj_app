import React, { useState } from 'react';

class TableLine extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const needsApproval = this.props.user.approved === "false" ? "needsApproval" : "";
        return (
            <React.Fragment>               
                <td key={Math.floor(Math.random()*100000000)}>{this.props.user.lastname}</td>
                <td key={Math.floor(Math.random()*100000000)}>{this.props.user.firstname}</td>
                <td key={Math.floor(Math.random()*100000000)}>{this.props.user.email}</td>
                <td key={Math.floor(Math.random()*100000000)}>{new Date(this.props.user.created_at).toDateString()}</td>          
                <td key={Math.floor(Math.random()*100000000)}>{this.props.user.role}</td>
                <td className={needsApproval} key={Math.floor(Math.random()*100000000)}>{this.props.user.approved}</td>
                <td><button onClick={ () => this.props.editUserCallback(this.props.user)}>EDIT USER</button></td>
            </React.Fragment>
        )
    }
}

export default TableLine;