import React from 'react';
import Axios from 'axios';

class Crew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crewMembers: []
        }

        console.log("CREW PAGE: ", props);        
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
        // console.log("STATE: ", this.state);
        return (
            <div>
                {this.state.crewMembers.map((value) => 
                    <p>{value.email}</p>
                )}
            </div>
           
        )
    }

    componentDidMount() {
        this.getCrewMembers();
    }
    
}



export default Crew;