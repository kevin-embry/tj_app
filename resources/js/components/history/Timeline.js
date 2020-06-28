import React from 'react';
import AdminModule from './AdminModule';
import EventsModule from './EventsModule';

class Timeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            historyEvents: [],
            lastPageIndex: 1
        }
    }

    // retrieveEvents() {
    //     console.log("Retrieving events from the Database.");
    //     Axios.get('/getTimelineEvents')
    //       .then((response) => {
    //           console.log(response);
    //           this.setState({
    //               historyEvents: response.data,
    //               lastPageIndex: Math.ceil(Object.keys(response.data).length / this.state.eventsPerPage)
    //           })
    //       })
    //       .catch((error) => {
    //           console.log(error);
    //       });
    // }

    render() {
        return (
            <div className="timeline">
                <AdminModule moduleName="Timeline"/>
                <EventsModule moduleName="Timeline"/>
            </div>
            
            
        )
    }
}

export default Timeline;