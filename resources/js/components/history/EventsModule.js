import React from 'react'
// import Axios from 'axios';
import EditEvent from './EditEvent';

class EventsModule extends React.Component {
    constructor(props) {
        super()
        this.state = {
          currentPage: 1,
          editEventVisible: false
        }

       this.handleClick = this.handleClick.bind(this);
       this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
       this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
       this.getFormattedDate = this.getFormattedDate.bind(this);
       this.handleEditEvent = this.handleEditEvent.bind(this);
       this.toggleEditEvent = this.toggleEditEvent.bind(this);
      }

      handleClick(e) {
          this.setState({
              currentPage: Number(e.target.id)
          })          
      }

      handleLeftArrowClick() {
          let pageDecrement = this.state.currentPage > 1 ? this.state.currentPage - 1 : 1;
        this.setState({
            currentPage: pageDecrement
        })
      }

      handleRightArrowClick() {
        console.log({
          currentPage: this.state.currentPage,
          lastPageIndex: this.props.lastPageIndex
        })
        let pageIncrement = this.state.currentPage < this.props.lastPageIndex ? this.state.currentPage + 1 : this.props.lastPageIndex;
        this.setState({
            currentPage: pageIncrement
        })
      }

      getFormattedDate(value) {
        const [year, month, day] = value.split('-');
        return [month,day,year].join('-');
      }

      handleEditEvent(event) {
        this.setState({           
            editId: event.id,
            editDate: event.eventdate,
            editEvent: event.activity,
            editNote: event.notes || ""
        })
        this.toggleEditEvent();
      }

      toggleEditEvent() {
          this.setState({
              editEventVisible: !this.state.editEventVisible
          })
          this.props.refreshEvents();
      }

      render() {
        //History Events are pulled in through props
        const historyEvents = this.props.events;
        const eventsPerPage = 8;
        const currentPage = this.state.currentPage;
       
        // ************Logic for displaying events
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        
        const currentEvents = historyEvents.slice(indexOfFirstEvent, indexOfLastEvent);

        const renderedEvents = currentEvents.map((event, index) => {
            return <tr key={"event"+index}>
                        <td>{this.getFormattedDate(event.eventdate)}</td>
                        <td>{event.activity}</td>
                        {event.notes !== null ? <td>{event.notes}</td> : <td></td>}
                        {this.props.adminMode === true ? 
                              <td className="eventsEditButton">
                                  <button 
                                    onClick={() => this.handleEditEvent(event)} 
                                    title="Edit User" value="EDIT">EDIT
                                  </button>
                              </td> 
                        : null}
                    </tr>
        });

        // ***************Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(historyEvents.length / eventsPerPage); i++) {
          pageNumbers.push(i);         
        } 

        const renderPageNumbers = pageNumbers.map(number => {
          if (number >= this.state.currentPage - 4 && number <=  this.state.currentPage + 4) {
            return (
              <li key={"page"+number}>
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
            <div className="eventsModule borderModule">
                <h1>USS Thomas Jefferson SSBN/SSN 618</h1>
                <h1>{this.props.moduleName}</h1>
                <hr />

                {(this.state.editEventVisible === true && this.props.adminMode === true) ? 
                    <EditEvent 
                        event={{
                            editId: this.state.editId,
                            editDate: this.state.editDate,
                            editEvent: this.state.editEvent,
                            editNote: this.state.editNote
                            }}
                        toggleEditCallback={this.toggleEditEvent}
                        updateURL={this.props.updateURL}
                        deleteURL={this.props.deleteURL}
                    /> : null}
                
                <div className="renderedEvents">
                    <table className="userTable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Activity</th>
                                <th>Notes</th>
                            </tr>                   
                        </thead>
                        <tbody>
                        {renderedEvents}                 
                        </tbody>
                    </table>
                </div> 
                <div className="eventPagination">
                    <ul className="pageNumbers">
                        {this.state.currentPage !== 1 && 
                        <li key="leftArrow" >
                          <button className="arrowButton" onClick={this.handleLeftArrowClick}><img src="../../images/icons/leftarrow_small.png" /></button>
                        </li>
                        }
                        {renderPageNumbers}
                        {this.state.currentPage !== this.props.lastPageIndex &&
                          <li key="rightArrow">
                            <button className="arrowButton" onClick={this.handleRightArrowClick}><img src="../../images/icons/rightarrow_small.png" /></button>
                          </li>
                        }
                    </ul>
                </div>
            </div>
          )
      }
}

export default EventsModule;