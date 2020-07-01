import React from 'react';
import Axios from 'axios';

class EditAnnouncements extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expireDate: "",
            message: ""
        }
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
                console.log(response);
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

    redirectToHome() {
        this.props.history.push("/");
    }


    render() {
        console.log(this.state);
        return(
            <div className="editAnnouncement borderModule">
                <h1>Admin Mode - Announcements</h1>
                <h2>Add and Edit announcements below</h2>
                <hr/>
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
                        >Update
                        </button>

                        <button 
                            className="cancelAnnouncement" 
                            title="Cancel Announcement"
                            onClick={this.handleCancel}
                        >Cancel
                        </button>
  
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAnnouncements;