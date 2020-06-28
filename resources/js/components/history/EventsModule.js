import React from 'react'
import Axios from 'axios';

class EventsModule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          historyEvents: [],
          currentPage: 1,
          eventsPerPage: 10,
          lastPageIndex: 1         
        }

       this.handleClick = this.handleClick.bind(this);
       this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
       this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
       this.getFormattedDate = this.getFormattedDate.bind(this);
      }

      retrieveEvents() {
          console.log("Retrieving events from the Database.");
          Axios.get('/getTimelineEvents')
            .then((response) => {
                console.log(response);
                this.setState({
                    historyEvents: response.data,
                    lastPageIndex: Math.ceil(Object.keys(response.data).length / this.state.eventsPerPage)
                })
            })
            .catch((error) => {
                console.log(error);
            });
      }

      handleClick(e) {
          this.setState({
              currentPage: event.target.id
          })
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

      getFormattedDate(value) {
          var date = new Date(value);
          var month = date.getMonth() + 1;
          var day = date.getDate();
          var year = date.getFullYear();
          return month + "/" + day + "/" + year;
      }

      render() {
        const { historyEvents, currentPage, eventsPerPage } = this.state;

          // Logic for displaying events
        const indexOfLastEvent = currentPage * eventsPerPage;
        const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
        const currentEvent = historyEvents.slice(indexOfFirstEvent, indexOfLastEvent);

        const renderEvents = currentEvent.map((event, index) => {
          return <li key={"event"+index}>{this.getFormattedDate(event.eventdate) + " | " + event.activity + (event.notes !== null ? " | " + event.notes : "")}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(historyEvents.length / eventsPerPage); i++) {
          pageNumbers.push(i);         
        } 

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li key={"page"+number}>
              <button className="paginationButton" id={number} onClick={this.handleClick}>{number}</button>
            </li>
          );
        });


        console.log(this.state);



          return (
            <div className="eventsModule borderModule">
                <h1>USS Thomas Jefferson SSBN/SSN 618</h1>
                <h1>{this.props.moduleName}</h1>
                <hr />
                <br />
                <div className="renderedEvents">
                    <ul className="event">{renderEvents}</ul>    
                </div> 
                <div className="eventPagination">
                    <ul className="pageNumbers">
                        <li key="leftArrow" ><button className="paginationButton" onClick={this.handleLeftArrowClick}><img src="../../images/icons/leftarrow_small.png" /></button></li>
                        {renderPageNumbers}
                        <li key="rightArrow"><button className="paginationButton" onClick={this.handleRightArrowClick}><img src="../../images/icons/rightarrow_small.png" /></button></li>
                    </ul>
                </div>
                
            </div>
          )
      }

    componentDidMount() {
        this.retrieveEvents();
    }
}



export default EventsModule;