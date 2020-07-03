import React from 'react';
import Axios from 'axios';
import EditSingleAnnouncement from './EditSingleAnnouncement';

class EditAnnouncements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            announcements: "",
            expireDate: "",
            message: ""
        }
        this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    clearFields() {
        this.setState({
            expireDate: "",
            message: ""
        })
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }

    handleSubmit() {
        if (this.state.expireDate !== "" && this.state.message !== "") {
            Axios.post('/storeAnnouncement', {
                expireDate: this.state.expireDate,
                message: this.state.message
            })
            .then((response) => {
                this.retrieveAnnouncements();
                this.clearFields();
                // this.redirectToHome();
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            console.log("Fields Blank");
        }
    }

    handleCancel(e) {
        this.clearFields();
        this.redirectToHome();
    }

    retrieveAnnouncements() {
        Axios.get('/getAnnouncements')
            .then((response) => {               
                this.setState({
                    announcements: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    redirectToHome() {
        this.props.history.push("/");
    }


    render() {
        // console.log(this.state);
        return(
            <div className="announcementModule borderModule">
                <span 
                    onClick={this.handleCancel}
                    className="close" 
                    title="Close Edit Announcements"
                    >&times;
                </span>
                <h1>Admin Mode - Announcements</h1>                
                <hr/>
                <h2>Add new announcements</h2>
                <div className="addAnnouncement">
                   
                    <p>When should this announcement expire:</p>
                    <input 
                        name="expireDate" 
                        className="expireDate" 
                        type="date" 
                        title="Enter Date"                      
                        placeholder="mm-dd-yyyy" 
                        value={this.state.expireDate} 
                        onChange={this.handleChange} 
                    /><br/>
                    <p>Enter the new announcement:</p>
                    <textarea 
                        name="message"
                        type="text" 
                        title="Enter the new announcement"
                        placeholder="Enter the new announcement" 
                        value={this.state.message} 
                        onChange={this.handleChange} 
                    />

                    <div>
                        <button
                            className="submitAnnouncement"
                            title="Submit New Announcement"
                            onClick={this.handleSubmit}
                        >Submit
                        </button>

                        <button 
                            className="cancelAnnouncement" 
                            title="Cancel Announcement"
                            onClick={this.handleCancel}
                        >Cancel
                        </button>
                    </div>
                </div>

                <hr/>

                <div className="editAnnouncements">
                    <h2>Edit Announcements</h2>
                    <p>Expire Date:</p>
                    {this.state.announcements !== "" ? 
                        this.state.announcements.map(value => 
                            <EditSingleAnnouncement 
                                key={"singleAnnouncment" + value.id} 
                                announcement={value}
                                retrieveAnnouncements={this.retrieveAnnouncements}
                            />) : null}
                   
                </div>
            </div>
        )
    }

    componentDidMount() {        
        
        this.retrieveAnnouncements();
    }
}

export default EditAnnouncements;