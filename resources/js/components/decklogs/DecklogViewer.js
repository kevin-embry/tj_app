import React from 'react';

class DecklogViewer extends React.Component {
    constructor(props) {
        super()
        this.closeViewer = this.closeViewer.bind(this);
    }

    getFormattedDate (value) {
        const [year, month, day] = value.split('-');
        return [month,day,year].join('-');
    }

    closeViewer(e) {
        this.props.closeViewerCallback();
    }

    render() {
        return (
            <div className="decklogViewer">
            <span 
                onClick={this.closeViewer}
                className="close" 
                title="Close Decklog"
            >&times;
            </span>
                <h2>{"Decklog: " + this.getFormattedDate(this.props.log.logdate)}</h2>  
                <p><label>Patrol Number: </label><span>{this.props.log.patrolnumber ? this.props.log.patrolnumber : "N/A"}</span></p>   
                <p><label>Patrol Notes: </label><span>{this.props.log.patrolnotes ? this.props.log.patrolnotes : "N/A"}</span></p>                         
                <embed 
                    name="singleDecklog" 
                    className="singleDecklog" 
                    src={this.props.source+"#view=FitH"}
                    width="100%"
                />
            </div>         
        )
    }
}

export default DecklogViewer;