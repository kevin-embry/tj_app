import React from 'react';
import AdminModule from './AdminModule';
import Axios from 'axios';
import DecklogViewer from './DecklogViewer';
import DeckLogResults from '../../fragments/DeckLogResults';

class DeckLogs extends React.Component {
    constructor(props) {
        super()
        this.state = {
            validYears: [],
            validMonths: [],
            validDays: [],
            filterYear: "",
            filterMonth: "",
            filterDay: "",
            selectedLogs: "",
            monthSelectDisabled: true,
            daySelectDisabled: true,
            searchButtonDisabled: true,
            deckLog: "",
            selectVisiblity : "componentVisible"
        }

        this.getMonthTranslation  = (monthValue) => {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'];
            return months[monthValue-1];
        }

        this.handleLogSelect = this.handleLogSelect.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.retrieveFilterInfo = this.retrieveFilterInfo.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.handleYearSelect = this.handleYearSelect.bind(this);
        this.handleMonthSelect = this.handleMonthSelect.bind(this);
        this.handleDaySelect = this.handleDaySelect.bind(this);
        this.handleDecklogSearch = this.handleDecklogSearch.bind(this);
        this.closeViewer = this.closeViewer.bind(this);
    }

    resetFilters() {
        this.setState({
            filterYear: "",
            filterMonth: "",
            filterDay: "",
            monthSelectDisabled: true,
            daySelectDisabled: true,
            searchButtonDisabled: true,
            selectedLogs: ""
        });
        this.retrieveFilterInfo("getYears");
    }

    handleYearSelect(e) {
        this.setState({
            filterYear: e.target.value,
            filterMonth: "",
            filterDay: "",
            daySelectDisabled: true,
            searchButtonDisabled: true,
            selectedLogs: ""
        });

        if (e.target.value !== "") {
            this.retrieveFilterInfo("getMonths", e.target.value);
            this.setState({monthSelectDisabled: false});
        } else {
            this.setState({
                monthSelectDisabled: true,
                daySelectDisabled: true,
                searchButtonDisabled: true
            });
        }
    }

    handleMonthSelect(e) {
        this.setState({filterMonth: e.target.value});
        if (e.target.value !== "") {
            this.retrieveFilterInfo("getDays", this.state.filterYear, e.target.value);
            this.setState({
                daySelectDisabled: false,
                searchButtonDisabled: false
            });
        } else {
            this.setState({
                daySelectDisabled: true, 
                filterDay: "",
                searchButtonDisabled: true
            });
        }
    }

    handleDaySelect(e) {
        this.setState({filterDay: e.target.value});
    }

    redirectToHome(e) {
        this.props.history.push('/');
    }

    retrieveFilterInfo(action, year, month) {
        Axios.post('/filterData', {
            action: action,
            year: year || null,
            month: month || null
        })
        .then((response) => {
            switch(action) {
                case "getYears":
                    this.setState({validYears: response.data});
                    break;
                case "getMonths":
                    this.setState({validMonths: response.data});
                    break;
                case "getDays":
                    this.setState({validDays: response.data});
                    break;
                default:
                    console.log("ERROR. UNKNOWN ACTION!");            
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleDecklogSearch(e) {
        Axios.post('/showDecklogs', {
            'filterYear': this.state.filterYear,
            'filterMonth': this.state.filterMonth,
            'filterDay': this.state.filterDay
        })
        .then((response) => {
            this.setState({
                selectedLogs: response.data.sort( (a,b) => (a.logdate > b.logdate) ? 1 : -1),
                // filterYear: "",
                // filterMonth: "",
                // filterDay: "",
                // monthSelectDisabled: true,
                daySelectDisabled: true,
                searchButtonDisabled: true
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleLogSelect(log) {
        this.setState({
            deckLog: log,
            selectVisiblity: "componentHide"
        });
    }

    closeViewer() {
        this.setState({
            deckLog: "",
            selectVisiblity: "componentVisible"
        })
    }

    render() {
        return (
            <div className="decklogs">
                {(this.props.adminMode === true && this.state.deckLog === "") ? <AdminModule resetFiltersCallback={this.resetFilters} redirectToHome={this.redirectToHome} /> : null }
                <div className={"borderModule logSelectContainer " + this.state.selectVisiblity}>
                    <span 
                        onClick={this.redirectToHome}
                        className="close" 
                        title="Close Decklogs"
                    >&times;
                    </span>
                    <h1>Deck Logs</h1>
                    <h3>Select at minimum a year and month</h3>
                    <hr />
                    <div className="filterContainer">
                        <div className="logYear">
                            <p>Select Year:</p>
                            <select name="filterYear" className="filterYear" title="Select a log year" value={this.state.filterYear} onChange={this.handleYearSelect}>
                                <option value="">Select Year</option>
                                {this.state.validYears.map(year => <option key={"filterYear"+year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <div className="logMonth">
                            <p>Select Month:</p>
                            <select name="filterMonth" className="filterMonth" title="Select a log month" value={this.state.filterMonth} onChange={this.handleMonthSelect} disabled={this.state.monthSelectDisabled}>
                                <option value="">Select Month</option>
                                {this.state.validMonths.map(month => <option key={"filterMonth"+month} value={month}>{this.getMonthTranslation(month)}</option>)}
                            </select>
                        </div>
                        <div className="logDay">
                            <p>Select Day:</p>
                            <select name="filterDay" className="filterDay" title="Select the day of the month" value={this.state.filterDay} onChange={this.handleDaySelect} disabled={this.state.daySelectDisabled}>
                                <option value="">Select Day</option>
                                {this.state.validDays.map(day => <option key={"filterDay"+day} value={day}>{day}</option>)}
                            </select>
                        </div>
                        <div className="filterSearch">
                            <p>Search Logs</p>
                            <button 
                                disabled={this.state.searchButtonDisabled}
                                title={this.state.searchButtonDisabled == true ? "Please select a year and month" : "Search for decklogs"}
                                onClick={this.handleDecklogSearch}
                            >Search</button>
                        </div>
                    </div>

                    {this.state.selectedLogs !== "" ? 
                        <div>
                            <hr />
                            <h3>Select a log to view:</h3>
                            <table className="logResults">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Log Date</th>
                                        <th>Patrol No.</th>
                                        <th>Patrol Notes</th>
                                    </tr>
                                    {this.state.selectedLogs.map((log) => <DeckLogResults 
                                                                                key={"dl"+log.file} 
                                                                                log={log} 
                                                                                logSelectCallback={this.handleLogSelect}
                                                                                refreshDecklogCallback={this.handleDecklogSearch} 
                                                                                adminMode={this.props.adminMode}
                                                                           /> )}
                                </tbody>
                            </table>
                            {this.state.selectedLogs.length > 3 && <div>PAGINATION HERE!</div>}
                        </div> 
                    : null }
                </div>
                 
                 {this.state.deckLog !== "" ? <DecklogViewer 
                                                    closeViewerCallback={this.closeViewer} 
                                                    log={this.state.deckLog} 
                                                    source={this.state.deckLog.file}
                                              /> : null}
      
            </div>
        );  
    }

    componentDidMount() {  
            this.retrieveFilterInfo("getYears");
    }
    
}

export default DeckLogs;
