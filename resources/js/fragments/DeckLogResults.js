import React from 'react';
import Axios from 'axios';

class DeckLogResults extends React.Component {
    constructor(props) {
        super()
        this.state = {
            patrolnumber: "",
            patrolnotes: "",
            editMode: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
        this.handlePatrolNotesChange = this.handlePatrolNotesChange.bind(this);
        this.handlePatrolNumberChange = this.handlePatrolNumberChange.bind(this);
        this.deleteDecklog = this.deleteDecklog.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    handlePatrolNumberChange(e) {
        this.setState({patrolnumber: e.target.value})
    }

    handlePatrolNotesChange(e) {
        this.setState({patrolnotes: e.target.value})
    }

    getFormattedDate (value) {
        const [year, month, day] = value.split('-');
        return [month,day,year].join('-');
    }

    undoChanges() {
        this.setState({
            patrolnumber: this.props.log.patrolnumber,
            patrolnotes: this.props.log.patrolnotes
        })
        this.toggleEdit();
    }

    toggleEdit() {
        this.setState({editMode: !this.state.editMode})
    }

    saveChanges() {
        Axios.post('/updateDecklog', {
            id: this.props.log.id,
            patrolnumber: this.state.patrolnumber.trim(),
            patrolnotes: this.state.patrolnotes.trim()
        })
        .then((response) => {
            this.toggleEdit();
            this.props.refreshDecklogCallback();
        })
        .catch((error) => {
            alert("Save failed");
            console.log(error);
        })
    }

    deleteDecklog() {
        Axios.post('/deleteDecklog', {
            id: this.props.log.id
        })
        .then((response) => {
            this.toggleEdit();
            this.props.refreshDecklogCallback();
        })
        .catch((error) => {
            alert("Delete failed");
            console.log(error);
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td><span>{this.props.log.id}</span></td>
                    <td><span>{this.getFormattedDate(this.props.log.logdate)}</span></td>
                    <td>
                        {(this.props.adminMode && this.state.editMode) ? 
                            <input 
                                className="editPatrolNumber" 
                                onChange={this.handlePatrolNumberChange} 
                                value={this.state.patrolnumber} 
                            /> :
                            <span>{this.state.patrolnumber ? this.state.patrolnumber : "N/A"}</span>
                        }
                    </td>
                    <td>
                        {(this.props.adminMode && this.state.editMode) ? 
                            <input 
                                className="editPatrolNotes" 
                                onChange={this.handlePatrolNotesChange} 
                                value={this.state.patrolnotes} 
                            /> :
                            <span>{this.state.patrolnotes ? this.state.patrolnotes : "N/A"}</span>
                        }
                    </td>
                    
                    {!this.state.editMode && <td>
                                                <button 
                                                    className="view" 
                                                    title="View Decklog"
                                                    onClick={(e) => this.props.logSelectCallback(this.props.log)}
                                                ><span><img src="..\..\..\images\icons\view-icon.svg"/></span></button>
                                            </td>
                    }

                    {(this.props.adminMode && !this.state.editMode) && <td><button 
                                                className="edit"
                                                title="Edit Decklog"
                                                onClick={this.toggleEdit}
                                            ><span><img src="..\..\..\images\icons\edit-icon.svg"/></span></button></td>}

                    {(this.props.adminMode && this.state.editMode) && <td><button 
                                                className="cancel"
                                                title="Cancel"
                                                onClick={this.undoChanges}
                                            ><span><img src="..\..\..\images\icons\undo-icon.svg"/></span></button></td>}                        

                    {(this.props.adminMode && this.state.editMode) && <td><button 
                                                className="save"
                                                title="Save Changes"
                                                onClick={(e) => { if (window.confirm('Are you sure you wish to update this decklog information?')) this.saveChanges(e)}} 
                                            ><span><img src="..\..\..\images\icons\save-icon.svg"/></span></button></td>}

                    {(this.props.adminMode && this.state.editMode) && <td><button 
                                                className="trash"
                                                title="Delete Decklog"
                                                onClick={(e) => { if (window.confirm('This action can not be reverted. Are you sure you wish to delete this decklog?')) this.deleteDecklog(e)}}
                                            ><span><img src="..\..\..\images\icons\trash_icon.png"/></span></button></td>}
                </tr>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.setState({
            patrolnumber: this.props.log.patrolnumber || "",
            patrolnotes: this.props.log.patrolnotes || ""
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.adminMode !== this.props.adminMode) {
            if(this.props.adminMode === false) {
                this.setState({editMode: false})
            }
        }
    }
   
}

export default DeckLogResults;