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
            submitSuccess: false,
            currentPage: 1,
            lastPageIndex: 1,
            crewPerPage: 12
        }
        this.getCrewMembers = this.getCrewMembers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goHome = this.goHome.bind(this);
        this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    }

    handleLeftArrowClick() {
        let pageDecrement = this.state.currentPage > 1 ? this.state.currentPage - 1 : 1;
      this.setState({
          currentPage: pageDecrement
      })
    }

    handleRightArrowClick() {      
      let pageIncrement = this.state.currentPage < this.state.lastPageIndex ? this.state.currentPage + 1 : this.state.lastPageIndex;
      this.setState({
          currentPage: pageIncrement
      })
    }

    handlePageButtonClick(e) {
        this.setState({
            currentPage: Number(e.target.id)
        })          
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
                            crewMembers: response.data,
                            lastPageIndex: Math.ceil(Object.keys(response.data).length / this.state.crewPerPage)
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
            errors.push('Date To must be greater or equal to Date From');
        } 
        return errors;
    }

    render() {
        //Build Divisions dropdown
        const divisions = [];
        Object.keys(DIVISIONS).forEach( (key) => {
            divisions.push(key);
        });

        const allCrewMembers = this.state.crewMembers;
        const crewPerPage = this.state.crewPerPage;
        const currentPage = this.state.currentPage;
       
        // ************Logic for displaying events
        const indexOfLastCrew = currentPage * crewPerPage;
        const indexOfFirstCrew = indexOfLastCrew - crewPerPage;
        
        const currentCrew = allCrewMembers.slice(indexOfFirstCrew, indexOfLastCrew);

        const renderedCrew = currentCrew.map((crewMember, index) => {
            return <EditCrewLine key={Math.floor(Math.random()*100000000)} crew={crewMember} rerenderCallback={this.getCrewMembers} />
        });

        // ***************Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allCrewMembers.length / crewPerPage); i++) {
          pageNumbers.push(i);         
        } 

        const renderPageNumbers = pageNumbers.map(number => {
          if (number >= this.state.currentPage - 4 && number <=  this.state.currentPage + 4) {
            return (
              <li key={"crewpage"+number}>
                <button 
                  className="paginationButton" 
                  id={number} 
                  onClick={this.handlePageButtonClick}
                  style={{backgroundColor: number === this.state.currentPage ? "#ffffff" : "#cccccc"}}
                  >{number}
                </button>
              </li>
            );
          }
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
                                        {divisions.map(division => <option key={"crew." + division}>{division}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="job" value={this.state.job} onChange={this.handleChange}>
                                        {DIVISIONS[this.state.division].map(job => <option key={"crew." + job}>{job}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="crew" value={this.state.crew} onChange={this.handleChange}>
                                        {CREWS.map(crew => <option key={"crew." + crew}>{crew}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="dateFrom" value={this.state.dateFrom} onChange={this.handleChange}>
                                        {SERVEDDATES.map(date => <option key={"dateFrom." + date}>{date}</option>)}
                                    </select>
                                </td>
                                <td>
                                    <select name="dateTo" value={this.state.dateTo} onChange={this.handleChange}>
                                        {SERVEDDATES.map(date => <option key={"dateTo." + date}>{date}</option>)}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="errorContainer">
                        
                        {this.state.errorsFound && 
                            <div>
                                <p>Please fix the following errors: </p>
                                {this.state.errorsFound.map(error => <p key={"crewError"+error}>{error}</p>)}
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
                        {/* CREW TABLE BUILT ABOVE IN RENDER() */}
                        {renderedCrew}
                        </tbody>
                    </table>
                    <div className="eventPagination">
                            <ul className="pageNumbers">
                                {this.state.currentPage !== 1 && 
                                <li key="leftArrow" >
                                    <button className="arrowButton" onClick={this.handleLeftArrowClick}><img src="../../images/icons/leftarrow_small.png" /></button>
                                </li>
                                }
                                {renderPageNumbers}
                                {this.state.currentPage !== this.state.lastPageIndex &&
                                    <li key="rightArrow">
                                        <button className="arrowButton" onClick={this.handleRightArrowClick}><img src="../../images/icons/rightarrow_small.png" /></button>
                                    </li>
                                }
                            </ul>
                        </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getCrewMembers();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.crewMembers !== prevState.crewMembers) {
             this.setState({
                 lastPageIndex: Math.ceil(this.state.crewMembers.length / this.state.crewPerPage)
             })
        }
    }
}

export default CrewAdmin;