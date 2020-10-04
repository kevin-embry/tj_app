import React from 'react';
import {CREWS, DIVISIONS, SERVEDDATES} from '../../data/tjConstants';
import Axios from 'axios';

class EditCrewLine extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id: "",
            lastName: "",
            firstName: "",
            division: "",
            job: "",
            crew: "",
            dateFrom: "",
            dateTo: "",
            jobsDropdown: [""],
            disabled: true,
            userEdited: false,
            dateError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleEdit() {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    undoChanges() {
        this.setState({
            lastName: this.props.crew.lastname,
            firstName: this.props.crew.firstname,
            division: this.props.crew.division,
            job: this.props.crew.job,
            crew: this.props.crew.crew,
            dateFrom: this.props.crew.datefrom,
            dateTo: this.props.crew.dateto,
            jobsDropdown: DIVISIONS[this.props.crew.division],
            dateError: false
        })
        this.toggleEdit();
    }

    handleChange(e) {
        e.preventDefault();
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
        if (e.target.name === "division") {
            console.log("DIVISION CHANGED!!!!");
            console.log(DIVISIONS[e.target.value][0]);
            this.setState({job: DIVISIONS[e.target.value][0]})
        }
    }

    handleLastnameChange(e) {
        this.setState({
            lastName: e.target.value
        })
        e.target.focus();
    }

    handleUpdate() {
        Axios.post('/updateCrew', {
            id: this.state.id,
            lastName: this.state.lastName.toLowerCase(),
            firstName: this.state.firstName.toLowerCase(),
            email: this.props.crew.email,
            division: this.state.division,
            job: this.state.job,
            crew: this.state.crew,
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo
        })
        .then((response) => {
            console.log(response)
            window.confirm('Update Success');
            this.props.rerenderCallback();
            this.toggleEdit();
        })
        .catch((error) => {
            console.log(error);
            this.setState({dateError: true});
            if(error.response.data.errors.dateTo !== null) {
                window.confirm('The start date must be less than or equal to the end date');
            }
        })
    }

    handleDelete(e) {
        e.preventDefault();
        Axios.post('/deleteCrew', {
            id: this.state.id
        })
        .then((response) => {
            this.props.rerenderCallback();
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    render() {
        const divisions = [];
        Object.keys(DIVISIONS).forEach( (key) => {
            divisions.push(key);
        });
        return (
            <React.Fragment>
                <tr>               
                    <td>
                        <input 
                            className="crewNamesInput"
                            key={Math.floor(Math.random()*100000000)}
                            name="lastName"
                            title={this.state.disabled ? "Field Disabled" : "Edit Last Name"}
                            value={this.state.lastName} 
                            disabled={this.state.disabled} 
                            onChange={this.handleLastnameChange.bind(this)} />
                    </td>

                    <td>
                        <input
                            className="crewNamesInput"
                            key={Math.floor(Math.random()*100000000)}
                            name="firstName"
                            title={this.state.disabled ? "Field Disabled" : "Edit First Name"}
                            value={this.state.firstName} 
                            disabled={this.state.disabled} 
                            onChange={this.handleChange.bind(this)} />
                    </td>

                    <td>
                        <select 
                            name="division"
                            className="crewSelects" 
                            key={Math.floor(Math.random()*100000000)}
                            value={this.state.division} 
                            title={this.state.disabled ? "Field Disabled" : "Edit Division"}
                            disabled={this.state.disabled} 
                            onChange={(e) => this.handleChange(e)}
                        >
                            {divisions.map(choice => <option key={Math.floor(Math.random()*100000000)}>{choice}</option>)}
                        </select>
                    </td>

                    <td>
                        <select 
                            name="job"
                            className="crewSelects" 
                            key={Math.floor(Math.random()*100000000)}
                            value={this.state.job} 
                            title={this.state.disabled ? "Field Disabled" : "Edit Job"}
                            disabled={this.state.disabled} 
                            onChange={(e) => this.handleChange(e)}
                        >
                            {this.state.jobsDropdown.map(choice => <option key={Math.floor(Math.random()*100000000)}>{choice}</option>)}
                        </select>
                    </td>

                    <td>
                        <select 
                            name="crew" 
                            value={this.state.crew} 
                            key={Math.floor(Math.random()*100000000)}
                            disabled={this.state.disabled} 
                            title={this.state.disabled ? "Field Disabled" : "Edit Crew"}
                            onChange={(e) => this.handleChange(e)}
                        >
                            {CREWS.map(value => <option key={Math.floor(Math.random()*100000000)}>{value}</option>)}
                        </select>
                        
                    </td>

                    <td className={this.state.dateError == true ? "crewError" : ""}>
                        <select 
                            name="dateFrom" 
                            className="crewSelects"
                            key={Math.floor(Math.random()*100000000)}
                            value={this.state.dateFrom} 
                            disabled={this.state.disabled}
                            title={this.state.disabled ? "Field Disabled" : "Edit Start Date"} 
                            onChange={(e) => this.handleChange(e)}
                        >
                            {SERVEDDATES.map(value => <option key={Math.floor(Math.random()*100000000)}>{value}</option>)}
                        </select>
                        <span> to </span>
                        <select 
                            name="dateTo"
                            className="crewSelects"
                            key={Math.floor(Math.random()*100000000)} 
                            value={this.state.dateTo} 
                            disabled={this.state.disabled} 
                            title={this.state.disabled ? "Field Disabled" : "Edit End Date"}
                            onChange={(e) => this.handleChange(e)}
                        >
                            {SERVEDDATES.map(value => <option key={Math.floor(Math.random()*100000000)}>{value}</option>)}
                        </select>
                    </td>

                    
                    {this.state.disabled &&
                    <td>
                        <button 
                        className="crewedit"
                        key={Math.floor(Math.random()*100000000)} 
                        title="Edit Crew Member" 
                        onClick={this.toggleEdit.bind(this)}
                        ><span><img src="..\..\..\images\icons\edit-icon.svg"/></span>
                        </button>
                    </td>
                    }

                    {this.state.disabled !== true &&
                        <td>
                            <button 
                            className="crewundo"
                            key={Math.floor(Math.random()*100000000)} 
                            title="Cancel changes" 
                            onClick={this.undoChanges.bind(this)}
                            ><span><img src="..\..\..\images\icons\undo-icon.svg"/></span>
                            </button>
                        </td>
                    }

                    {this.state.disabled !== true && 
                        <td>
                            <button 
                            className="crewsave"
                            key={Math.floor(Math.random()*100000000)} 
                            title="Save changes to crew member" 
                            onClick={(e) => { if (window.confirm('Are you sure you wish to update the crew member information?')) this.handleUpdate(e)}} 
                            ><span><img src="..\..\..\images\icons\save-icon.svg"/></span>
                            </button>
                        </td>
                    }

                    {this.state.disabled !== true && 
                        <td>
                            <button 
                            className="crewdelete"
                            key={Math.floor(Math.random()*100000000)} 
                            title="Delete Crew Member" 
                            onClick={(e) => { if (window.confirm('This action can not be reverted. Are You sure you wish to delete this crew member?')) this.handleDelete(e)}} 
                            ><span><img src="..\..\..\images\icons\trash_icon.png"/></span>
                            </button>
                        </td>
                    }
                </tr>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.setState({
            id: this.props.crew.id,
            lastName: this.props.crew.lastname,
            firstName: this.props.crew.firstname,
            division: this.props.crew.division,
            job: this.props.crew.job,
            crew: this.props.crew.crew,
            dateFrom: this.props.crew.datefrom,
            dateTo: this.props.crew.dateto,
            jobsDropdown: DIVISIONS[this.props.crew.division]
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.division !== this.state.division) {
            this.setState({
                jobsDropdown: DIVISIONS[this.state.division]
            })
        }
    }
}

export default EditCrewLine;