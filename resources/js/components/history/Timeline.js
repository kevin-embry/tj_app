import React from 'react';
import Axios from 'axios';
import AdminModule from './AdminModule';
import EventsModule from './EventsModule';

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            historyEvents: [{id: 0, eventdate: "", activity: "", notes: ""}],
            eventsPerPage: 20,
            lastPageIndex: 1
        }
        this.retrieveEvents();
        this.redirectToHome = this.redirectToHome.bind(this);
        this.retrieveEvents = this.retrieveEvents.bind(this);
    }

    retrieveEvents() {
        Axios.get('/getTimelineEvents')
          .then((response) => {
              this.setState({
                  historyEvents: response.data,
                  lastPageIndex: Math.ceil(Object.keys(response.data).length / this.state.eventsPerPage)
              })
          })
          .catch((error) => {
              console.log(error);
          });
    }

    redirectToHome() {
        this.props.history.push("/");
    }

    render() {
        // console.log(this.props);
        return (
            <div className="timeline">
                {this.props.adminMode===true ? 
                    <AdminModule 
                        moduleName="Timeline" 
                        storeURL="/storeTimeline" 
                        refreshEvents={this.retrieveEvents}
                        goHome={this.redirectToHome}
                    /> : null}
                <EventsModule 
                    moduleName="Timeline" 
                    events={this.state.historyEvents} 
                    lastPageIndex={this.state.lastPageIndex}
                    eventsPerPage={this.state.eventsPerPage}
                    adminMode={this.props.adminMode}
                    refreshEvents={this.retrieveEvents}
                    updateURL="/updateTimelineEvent"
                    deleteURL="/deleteTimelineEvent"
                /> 
            </div>
        )
    }
}

export default Timeline;