import React from 'react';
import Axios from 'axios';

class AdminModule extends React.Component {
    constructor(props) {
        super()
        this.state = {
            logDate: "",
            patrolNumber: "",
            patrolNotes: "",
            file: [],
            successMessage: "hide",
            errorMessage: "hide",
            failMessages: []
        }
       
        this.today = () => {
            let date = new Date();
            return date.getFullYear() + "-" + (((date.getMonth()+1) < 10)?"0":"") + (date.getMonth()+1) + "-" + ((date.getDate() < 10)?"0":"") + date.getDate();
        } 
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }

    handleCancel(e) {
        this.props.redirectToHome();
    }

    clearFields() {
        this.setState({
            logDate: "",
            patrolNumber: "",
            patrolNotes: "",
            file: []
        });
    }

    handleFileInputChange(e) {
        const selectedFile = e.target.files[0];
        this.setState({
            file: selectedFile
        });
    }

    buildErrors(errorObject) {
        let errorArray = [];
        for (const [key, value] of Object.entries(errorObject)) {
            errorArray.push(value[0]);
        }
        this.setState({failMessages: errorArray});
    }

    handleFileUpload(e) {       
        var formData = new FormData();
        formData.append('logdate', this.state.logDate);
        formData.append('postdate', this.today());
        formData.append('patrolnumber', this.state.patrolNumber);
        formData.append('patrolnotes', this.state.patrolNotes);      
        formData.append('file', this.state.file);

        Axios.post('/storeDecklog', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response);
            this.setState({successMessage: "visible"});
            setTimeout(() => {
                this.setState({ successMessage: "hide" });
                this.clearFields(); 
                this.props.resetFiltersCallback();
            }, 3000);
        })
        .catch((error) => {
            this.buildErrors(error.response.data.errors);            
            this.setState({errorMessage: "visible"});
            setTimeout(() => {
                this.setState({ errorMessage: "hide" });               
            }, 3500);
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className="borderModule dlAdmin">
                <h1>Admin Mode - Add Deck Log</h1>
                <hr />
               
                <div className="infoContainer">
                    <label>LogDate: </label>
                    <input 
                        name="logDate"
                        className="logDate"
                        type="date"
                        min="1958-01-01"
                        max="2000-12-31"
                        placeholder="mm-dd-yyyy" 
                        title="Log Date"
                        value={this.state.logDate}
                        onChange={this.handleChange}
                    />  
                    <label>Patrol Number:</label>
                    <input 
                        name="patrolNumber"
                        className="patrolNumber"
                        title="Patrol Number"
                        placeholder="Optional"
                        value={this.state.patrolNumber}
                        onChange={this.handleChange}
                    />
                    <label>Notes:</label>
                    <input 
                        name="patrolNotes"
                        className="patrolNotes"
                        title="Patrol Notes"
                        placeholder="Optional"
                        value={this.state.patrolNotes}
                        onChange={this.handleChange}
                    />          
                </div>
                <div className="filesContainer">
                    <p>Select file in .pdf format only:</p>
                    <input name="file" className="dlFiles" type="file" onChange={this.handleFileInputChange} />
                    {this.state.file.length === 0 ? 
                        <p>Select a file to upload</p> :
                        <div className="fileInfoContainer">
                            <p><b>Name:</b>&nbsp;{this.state.file.name}&emsp;<b>Size:</b>&nbsp;{this.state.file.size}KB</p>
                        </div>
                    }
                </div>
                {this.state.successMessage === "visible" ? <p className="valid">Upload Successfull</p> : null}
                {this.state.errorMessage === "visible" ?                 
                    this.state.failMessages.map( message => <p className="error" key={message}>{message}</p> )
                    : null}
                <div className="decklogAdminButtons">
                    <button className="dlAdminSubmit" onClick={this.handleFileUpload}>Submit</button>                   
                    <button className="dlAdminCancel" onClick={this.handleCancel}>Cancel</button>
                    <button className="dlAdminClear" onClick={this.clearFields}>Clear Fields</button>
                </div>
            </div>
        )
    }

}

export default AdminModule;