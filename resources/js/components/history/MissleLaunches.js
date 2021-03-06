import React from 'react';
import Axios from 'axios';
import AdminModule from './AdminModule';
import EventsModule from './EventsModule';

class MissleLaunches extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            historyEvents: [{id: 0, eventdate: "", activity: "", notes: ""}],
            eventsPerPage: 15,
            lastPageIndex: 1
        }
        this.retrieveEvents();
        this.redirectToHome = this.redirectToHome.bind(this);
        this.retrieveEvents = this.retrieveEvents.bind(this);
    }

    retrieveEvents() {
        Axios.get('/getMissleLaunchEvents')
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
        return (
            <div className="misslelaunches">
                {this.props.adminMode===true ? 
                    <AdminModule 
                        moduleName="Missle Launches" 
                        storeURL="/storeMissleLaunch" 
                        refreshEvents={this.retrieveEvents}
                        goHome={this.redirectToHome}
                    /> : null}
                <EventsModule 
                    moduleName="Missle Launches" 
                    events={this.state.historyEvents} 
                    lastPageIndex={this.state.lastPageIndex}
                    eventsPerPage={this.state.eventsPerPage}
                    adminMode={this.props.adminMode}
                    refreshEvents={this.retrieveEvents}
                    updateURL="/updateMissleLaunchEvent"
                    deleteURL="/deleteMissleLaunchEvent"
                /> 
            </div>
        )
    }
}

export default MissleLaunches;