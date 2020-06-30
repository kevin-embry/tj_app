import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class AdminModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            historyDate: "",
            historyEvent: "",
            historyNotes: "",
            showErrorMessage: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.checkFields = this.checkFields.bind(this);
        this.handleNewEvent = this.handleNewEvent.bind(this);
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }

    handleNewEvent(e) {
        const validSumbit = this.checkFields();
        if(validSumbit) {
            Axios.post(this.props.storeURL, {
                date: this.state.historyDate,
                eventName: this.state.historyEvent,
                eventNotes: this.state.historyNotes
            }).then((response) => {

                this.props.refreshEvents();

                this.setState({showSuccessMessage: true});
                setTimeout(() => {
                    this.setState({ showSuccessMessage: false });
                    this.clearFields();
                }, 2500);
            }).catch((error) => {
                console.log(error);
            })
           
        } else {
            this.setState({showErrorMessage: true});
            setTimeout(() => {
                this.setState({ showErrorMessage: false });
            }, 2500);
        }
    }

    checkFields() {
        if (this.state.historyDate !== "" && this.state.historyEvent !== "") {
            return true;
        } else {
            return false;
        }
    }

    clearFields(e) {
        this.setState({
            historyDate: "",
            historyEvent: "",
            historyNotes: ""
        })
    }

    // DOESNT WORK!!!!!!!
    handleCancel(e){
        this.clearFields();
        this.props.goHome();
    }

    render() {
        // console.log(this.props);
        return (
            <div className="historyAdmin borderModule">
                <h1>Admin Mode - {this.props.moduleName}</h1>
                <h3>New Events require a minimum of date and event name. Notes are optional.</h3>
                <hr/>
                <div className="addevent">
                    {/* <button type="button">
                        <img src="../../images/icons/plus_icon.png" /><span>Add</span> 
                    </button> */}
                    <span>Add New:</span>
                    <input 
                        name="historyDate" 
                        className="historyDate" 
                        type="date"
                        min="1958-01-01"
                        max="2000-12-31"
                        placeholder="mm-dd-yyyy" 
                        value={this.state.historyDate} 
                        onChange={this.handleChange} 
                    />
                    <input name="historyEvent" className="historyEvent" placeholder="Activity/Event Name" value={this.state.historyEvent} onChange={this.handleChange} ></input>
                    <input name="historyNotes" className="historyNotes" placeholder="Notes For Activity/Event" value={this.state.historyNotes} onChange={this.handleChange} ></input>                    
                   
                </div>
                {this.state.showErrorMessage === true ? <p id="addEventError" className="error">Error. Please fill in required fields</p> : ""}
                {this.state.showSuccessMessage === true ? <p  className="valid">Record Successfully Inserted</p> : ""}
               
               {/* TODO: ADD ICONS IN BUTTONS BELOW. CHANGE SUBMIT TO ADD */}
                <div className="historyAdminButtons">
                    <button className="historyAdminSubmit" onClick={this.handleNewEvent}>Submit</button>
                    {/* NEED TO HANDLE CANCEL STILL!!!! */}
                    <button className="historyAdminCancel" onClick={this.handleCancel}>Cancel</button>
                    <button type="button" className="historyAdminClear" onClick={this.clearFields}>Clear Fields</button>
                </div>
            </div>
        )
    }
}

export default AdminModule;