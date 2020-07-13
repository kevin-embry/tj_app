import React, { useState } from 'react';

class DeckLogResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startIndex: 0,
            endIndex: 3,
            lastLog: props.data.length - 1,
            content: []
        }
        this.buildResults = this.buildResults.bind(this);
    }

    getFormattedDate (value) {
        const [year, month, day] = value.split('-');
        return [month,day,year].join('-');
      }

    buildResults() {
        var startSlice = 0;
        var endSlice = 4;
        var lastLogIndex = this.props.data.length;

        var slice = [];
        var rows = [];
        while (startSlice <= lastLogIndex) {
            slice = this.props.data.slice(startSlice, endSlice);
            rows.push(
                <tr key={"tr"+startSlice}>
                    {slice.map((log) => {
                        return <td key={"log"+log.logdate}><span onClick={(e) => this.props.logSelectCallback(log)}>{this.getFormattedDate(log.logdate)}</span></td>
                    })}
                </tr>
            );
            startSlice = endSlice;
            (endSlice + 4) < lastLogIndex ? endSlice = (endSlice + 4) : endSlice = lastLogIndex + 1; 
        }
        this.setState({content: rows});
    }  
    
    render() {
        return (
            <React.Fragment>
               {this.state.content}
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.buildResults();
    }
}

export default DeckLogResults;