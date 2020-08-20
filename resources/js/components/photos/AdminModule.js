import React from 'react';
import AdminNewGallery from './AdminNewGallery';
import AdminUpdateGallery from './AdminUpdateGallery';

class AdminModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateGallery: true,
            newGallery: false
        }
        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    }

    handleCheckboxCheck(e) {
        if(e.target.name === "newGallery") {
            this.setState({newGallery: !this.state.newGallery});
            if(this.state.updateGallery === true) this.setState({updateGallery: false})
        }
        if(e.target.name === "updateGallery") {
            this.setState({updateGallery: !this.state.updateGallery});
            if(this.state.newGallery === true) this.setState({newGallery: false})
        }
    }

    render() {
        return (
            <div className="photoAdmin borderModule">
                <span 
                    onClick={ (e) => this.props.goHome(e)}
                    className="close" 
                    title="Close Add/Edit Photos"
                    >&times;
                </span>
                <h1>Admin Mode - Add/Edit Photos</h1>
                <hr />
                <div className="checkbox-container">
                    <label htmlFor="updateGallery">Update Existing Gallery:
                    <input name="updateGallery" type="checkbox" checked={this.state.updateGallery} onChange={this.handleCheckboxCheck} /></label>
                    <label htmlFor="newGallery">New Gallery:
                    <input name="newGallery" type="checkbox" checked={this.state.newGallery} onChange={this.handleCheckboxCheck} /></label>
                </div>
                {this.state.newGallery && <AdminNewGallery />}
                {this.state.updateGallery && <AdminUpdateGallery adminMode={this.props.adminMode}/>}
            </div>
        );
    }
}

export default AdminModule;