import React from 'react';
import Axios from 'axios';

class EditSingleAnnouncement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.announcement.id,
            announceDate: props.announcement.expiredate,
            announceMessage: props.announcement.message
        }
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleUpdate(e) {
        // console.log('IN UPDATE!!!!!!!');
        Axios.post('/updateAnnouncement', {
            id: this.state.id,
            expireDate: this.state.announceDate,
            message: this.state.announceMessage
        })
        .then((response) => {
            console.log(response);
            this.props.retrieveAnnouncements();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleDelete(e) {
        console.log('IN DELETE!!!!!!!');
        Axios.post('/deleteAnnouncement', {
            id: this.state.id
        })
        .then((response) => {
            console.log(response);
            this.props.retrieveAnnouncements();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }



    render() {
            
        return (
            <div className="singleAnnouncment">              
                <input 
                    name="announceDate" 
                    type="date" 
                    className="announceDate" 
                    value={this.state.announceDate} 
                    onChange={this.handleChange} 
                />
                <textarea 
                    name="announceMessage" 
                    className="announceMessage" 
                    value={this.state.announceMessage} 
                    onChange={this.handleChange} 
                />
                <button 
                    className="updateButton"
                    title="Submit Update To Announcement" 
                    onClick={(e) => { if (window.confirm('Are You sure you wish to update this announcement?')) this.handleUpdate(e)}} 
                >Update</button>
                <button 
                    className="deleteButton"
                    title="Delete Announcement" 
                    onClick={(e) => { if (window.confirm('This action can not be reverted. Are You sure you wish to delete this announcement?')) this.handleDelete(e)}} 
                   ><span><img src="..\..\..\images\icons\trash_icon.png"/></span>
                </button>
            </div>
        )
    }
}

export default EditSingleAnnouncement;