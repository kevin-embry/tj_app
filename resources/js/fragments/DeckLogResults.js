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
            patrolnumber: this.state.patrolnumber,
            patrolnotes: this.state.patrolnotes
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteDecklog() {
        Axios.post('/deleteDecklog', {
            id: this.props.id
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    render() {
        // console.log(this.props);
        return (
            <React.Fragment>
                <tr>
                    <td><span>{this.props.log.id}</span></td>
                    <td><span>{this.getFormattedDate(this.props.log.logdate)}</span></td>
                    <td>
                        {(this.props.adminMode && this.state.editMode) ? 
                            <input 
                                className="editPatrolNumber" 
                                placehoplder="N/A"
                                onChange={this.handlePatrolNumberChange} 
                                value={this.state.patrolnumber} 
                            /> :
                            <span>{this.props.log.patrolnumber}</span>
                        }
                    </td>
                    <td>
                        {(this.props.adminMode && this.state.editMode) ? 
                            <input 
                                className="editPatrolNotes" 
                                placeholder="N/A"
                                onChange={this.handlePatrolNotesChange} 
                                value={this.state.patrolnotes} 
                            /> :
                            <span>{this.props.log.patrolnotes}</span>
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
                                                onClick={this.saveChanges}
                                            ><span><img src="..\..\..\images\icons\save-icon.svg"/></span></button></td>}

                    {(this.props.adminMode && this.state.editMode) && <td><button 
                                                className="trash"
                                                title="Delete Decklog"
                                                onClick={this.deleteDecklog}
                                            ><span><img src="..\..\..\images\icons\trash_icon.png"/></span></button></td>}
                </tr>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.setState({
            patrolnumber: this.props.log.patrolnumber,
            patrolnotes: this.props.log.patrolnotes
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