import React from 'react';
import Axios from 'axios';
import CrewAdmin from './CrewAdmin';

class Crew extends React.Component {
    constructor(props) {
        super();
        this.state = {
            crewMembers: [],
            currentPage: 1,
            lastPageIndex: 1,
            crewPerPage: 15
        }
        this.getCrewMembers = this.getCrewMembers.bind(this);
        this.goHome = this.goHome.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(e) {
        this.setState({
            currentPage: Number(e.target.id)
        })          
    }

    goHome() {
        this.props.history.push("/");
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
  
    render() {
        const allCrewMembers = this.state.crewMembers;
        const crewPerPage = this.state.crewPerPage;
        const currentPage = this.state.currentPage;
       
        // ************Logic for displaying events
        const indexOfLastCrew = currentPage * crewPerPage;
        const indexOfFirstCrew = indexOfLastCrew - crewPerPage;
        
        const currentCrew = allCrewMembers.slice(indexOfFirstCrew, indexOfLastCrew);

        const renderedCrew = currentCrew.map((crewMember, index) => {
            return <tr>
                        <td>{crewMember.lastname}</td>
                        <td>{crewMember.firstname}</td>
                        <td>{crewMember.division}</td>
                        <td>{crewMember.job}</td>
                        <td>{crewMember.crew}</td>
                        <td>{crewMember.datefrom + " - " + crewMember.dateto}</td>
                    </tr>
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
                  onClick={this.handleClick}
                  style={{backgroundColor: number === this.state.currentPage ? "#ffffff" : "#cccccc"}}
                  >{number}
                </button>
              </li>
            );
          }
        });
        return (
            <div>
                {this.props.adminMode && <CrewAdmin goHome={this.goHome}/>}

                {this.props.adminMode !== true && 
                    <div className="crewModule borderModule">
                        <span 
                            // onClick={}
                            className="print" 
                            title="Print Coming Soon"
                            ><img src="..\..\..\images\icons\print-icon.svg"/>
                        </span>
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
                }
            </div>
        )
    }

    componentDidMount() {
        this.getCrewMembers();
    }
    
}

export default Crew;