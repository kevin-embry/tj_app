import React from 'react';
import EditCrewLine from './EditCrewLine';
import {CREWS, DIVISIONS, SERVEDDATES} from '../../data/tjConstants';
import DataChecker from '../../data/DataChecker';
import Axios from 'axios';

class CrewAdmin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            crewMembers: [],
            lastName: "",
            firstName: "",
            division: "co",
            job: "captain",
            crew: "blue",
            dateFrom: "1962",
            dateTo: "1962",
            errorsFound: "",
            submitSuccess: false
        }
        this.getCrewMembers = this.getCrewMembers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    goHome() {
        this.props.goHome();
    }

    clearFields() {
        this.setState({
            lastName: "",
            firstName: "",
            division: "co",
            job: "captain",
            crew: "blue",
            dateFrom: "1962",
            dateTo: "1962",
            errorsFound: ""
        })
    }

    getCrewMembers() {
        return Axios.get('/getCrew')
                    .then((response) => {
                        this.setState({
                            crewMembers: response.data
                        })
                    })
                    .catch(error => console.log(error));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            errorsFound: ""
        })
        let errors = this.checkData(this.state.firstName, this.state.lastName, this.state.dateFrom, this.state.dateTo);
        if(errors.length === 0) {
            Axios.post('/storeCrew', {
                lastName: this.state.lastName.toLowerCase(),
                firstName: this.state.firstName.toLowerCase(),
                division: this.state.division,
                job: this.state.job,
                crew: this.state.crew,
                dateFrom: this.state.dateFrom,
                dateTo: this.state.dateTo
            })
            .then((response) => {
                // console.log(response);
                this.setState({submitSuccess: true});
                setTimeout(() => {
                    this.setState({ submitSuccess: false });
                    this.clearFields();
                    this.getCrewMembers();
                }, 2500);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            console.log("ERRORS FOUND!", errors);
            this.setState({
                errorsFound: errors
            })
        }

    }

   

    handleChange(e) {
        e.preventDefault();
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }

    checkData(firstName, lastName, dateFrom, dateTo) {
        let errors = [];
        if(!DataChecker.checkLastName(lastName)) {
            errors.push('Last Name');
        } 
        if(!DataChecker.checkFirstName(firstName)) {
            errors.push('First Name');
        } 
        if(!DataChecker.checkServedYears(dateFrom, dateTo)) {
            errors.push('Date to must be greater or equal to Date From');
        } 
        return errors;
    }
    

    render() {
        const divisions = [];
        Object.keys(DIVISIONS).forEach( (key) => {
            divisions.push(key);
        });
        return(
            <div className="crewadmin borderModule">
                <span 
                    onClick={this.goHome}
                    className="close" 
                    title="Close"
                    >&times;
                </span>
                <h1>Crew - Admin Module</h1>
                <hr />

                <div className="addCrewModule">
                    <table className="addCrewTable">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Division</th>
                                <th>Job</th>
                                <th>Crew</th>
                                <th>Date From</th>
                                <th>Date To</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input name="lastName" value={this.state.lastName} onChange={this.handleChange}/></td>
                                <td><input name="firstName" value={this.state.firstName} onChange={this.handleChange}/></td>
                                <td>
                                    <select name="division" value={this.state.division} onChange={this.handleChange}>
                                        {divisions.map(division => <option>{division}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="job" value={this.state.job} onChange={this.handleChange}>
                                        {DIVISIONS[this.state.division].map(job => <option>{job}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="crew" value={this.state.crew} onChange={this.handleChange}>
                                        {CREWS.map(crew => <option>{crew}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="dateFrom" value={this.state.dateFrom} onChange={this.handleChange}>
                                        {SERVEDDATES.map(date => <option>{date}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="dateTo" value={this.state.dateTo} onChange={this.handleChange}>
                                        {SERVEDDATES.map(date => <option>{date}</option>)}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="errorContainer">
                        
                        {this.state.errorsFound && 
                            <div>
                                <p>Please fix the following errors: </p>
                                {this.state.errorsFound.map(error => <p>{error}</p>)}
                            </div>}
                    </div>
                    {this.state.submitSuccess === true && <p className="valid">Submit Success</p>}
                    
                    <div className="crewButtons">
                        <button className="crewSubmit" onClick={this.handleSubmit}>Submit</button>
                        <button className="crewCancel" onClick={this.goHome}>Cancel</button>
                        <button className="crewClear" onClick={this.clearFields.bind(this)} >Clear Fields</button>
                    </div>
                    
                </div>


                <div className="crewModule">
                    <table className="crewTable">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Division</th>
                                <th>Job</th>
                                <th>Crew</th>
                                <th>Dates On Board</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.crewMembers.map((crewMember) => 
                            <EditCrewLine key={Math.floor(Math.random()*100000000)} crew={crewMember} rerenderCallback={this.getCrewMembers} />
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getCrewMembers();
    }
}

export default CrewAdmin;