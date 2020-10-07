import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import AddNewspaper from './AddNewspaper';
import EditModule from './EditModule';

class AdminModule extends React.Component {
    constructor(props) {
        super()
        this.state = {
            updateNewspaper: true,
            newNewspaper: false
        }
    }

    handleCheckboxCheck(e) {
        if(e.target.name === "newNewspaper") {
            this.setState({newNewspaper: !this.state.newNewspaper});
            if(this.state.updateNewspaper === true) this.setState({updateNewspaper: false})
        }
        if(e.target.name === "updateNewspaper") {
            this.setState({updateNewspaper: !this.state.updateNewspaper});
            if(this.state.newNewspaper === true) this.setState({newNewspaper: false})
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="newspaperAdmin borderModule" >
                <span 
                    onClick={ (e) => this.props.goHome(e)}
                    className="close" 
                    title="Close Add/Edit Photos"
                    >&times;
                </span>
                <h1>Admin Mode- TJ in the News</h1>
                
                <hr />
                <div className="checkbox-container">
                    <label htmlFor="updateNewspaper">Edit Newspaper Images:
                    <input name="updateNewspaper" type="checkbox" checked={this.state.updateNewspaper} onChange={this.handleCheckboxCheck.bind(this)} /></label>
                    <label htmlFor="newNewspaper">Upload New Newspaper Image(s):
                    <input name="newNewspaper" type="checkbox" checked={this.state.newNewspaper} onChange={this.handleCheckboxCheck.bind(this)} /></label>
                </div>

                {this.state.updateNewspaper && <EditModule />
                    // <div className="update_module">UPDATE MODULE</div>
                }
                {this.state.newNewspaper && <AddNewspaper />}
            </div>
        )
    }
}

export default AdminModule;