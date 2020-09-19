import React from 'react';
import Axios from 'axios';
import CrewAdmin from './CrewAdmin';

class Crew extends React.Component {
    constructor(props) {
        super();
        this.state = {
            crewMembers: []
        }
        this.getCrewMembers = this.getCrewMembers.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    goHome() {
        this.props.history.push("/");
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
  
    render() {
        return (
            <div>
                {this.props.adminMode && <CrewAdmin goHome={this.goHome}/>}

                {this.props.adminMode !== true && 
                    <div className="crewModule borderModule">
                        <h1>Crew Roster</h1>
                        <hr />
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
                                <tr>
                                    <td>{crewMember.lastname}</td>
                                    <td>{crewMember.firstname}</td>
                                    <td>{crewMember.division}</td>
                                    <td>{crewMember.job}</td>
                                    <td>{crewMember.crew}</td>
                                    <td>{crewMember.datefrom + " - " + crewMember.dateto}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        this.getCrewMembers();
    }
    
}

export default Crew;