import React from 'react';
import Axios from 'axios';

class EditEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editId: props.event.editId,
            editDate: props.event.editDate,
            editEvent: props.event.editEvent,
            editNote: props.event.editNote || ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.clearEditFields = this.clearEditFields.bind(this);
    }

    clearEditFields(){
        this.setState({
            editDate: "",
            editEvent: "",
            editNote: ""
        })
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }

    handleCancel() {        
        this.props.toggleEditCallback();
        this.clearEditFields();
    }

    handleDelete() {
        Axios.post(this.props.deleteURL, {
                id: this.state.editId,
                editedDate: this.state.editDate,
                editedEvent: this.state.editEvent,
                editedNote: this.state.editNote
        })
          .then((response) => {
              console.log("Event Deleted");
              this.clearEditFields();
              this.props.toggleEditCallback();           
          })
          .catch((error) => {
              console.log(error);
          });
    }

    handleUpdate() {
        Axios.post(this.props.updateURL, {
            id: this.state.editId,
            editedDate: this.state.editDate,
            editedEvent: this.state.editEvent,
            editedNote: this.state.editNote
    })
      .then((response) => {
          console.log("Event Updated");
          this.clearEditFields();
          this.props.toggleEditCallback();           
      })
      .catch((error) => {
          console.log(error);
      });
    }

    render() {
        return (
            <div className="editLineEvent">
                <h2>Edit Event:</h2>
                <input 
                    name="editDate" 
                    className="editDate" 
                    type="date"
                    min="1958-01-01"
                    max="2000-12-31"
                    placeholder="mm-dd-yyyy" 
                    value={this.state.editDate} 
                    onChange={this.handleChange} 
                />
                <input name="editEvent" className="editEvent" placeholder="Activity/Event Name" value={this.state.editEvent} onChange={this.handleChange}/>
                <input name="editNote" className="editNote" placeholder="Notes For Activity/Event" value={this.state.editNote} onChange={this.handleChange}/>
                <button 
                    className="updateButton"
                    title="Submit Update To User" 
                    onClick={(e) => { if (window.confirm('Are You sure you wish to update this event?')) this.handleUpdate(e)}} 
                >Update</button>
                <button className="cancelButton" onClick={this.handleCancel} title="Cancel Edit User">Cancel</button>
                <button 
                    className="deleteButton"
                    title="Delete User" 
                    onClick={(e) => { if (window.confirm('This action can not be reverted. Are You sure you wish to delete this event?')) this.handleDelete(e)}} 
                   ><span><img src="..\..\..\images\icons\trash_icon.png"/></span>
                </button>
            </div> 
        )
    }
}

export default EditEvent;