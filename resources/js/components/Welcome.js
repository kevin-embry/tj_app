import React from 'react';
// import { AuthContext, useAuth } from '../context/auth';
import { RestDataSource } from '../webservice/RestDataSource';
import Axios from 'axios';
import Announcement from './announcements/Announcement';

export default class Welcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            today: new Date(),
            announcements: [],
            welcomemessage: "",
            lastUpdate: "",
            user: {},
            editMode: false,
            originalMessage: "",
            showUpdateMessage: "hide"
        }               
        this.dataSource = new RestDataSource("/getWelcome");
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    }

    handleEditClick(e) {
        this.setState({
            originalMessage: this.state.welcomemessage,
            editMode: true
        }); 
    }

    handleCancel(e) {
        this.setState({
            welcomemessage: this.state.originalMessage,
            editMode: false
        })
    }

    handleSubmit(e) {
        if (this.state.originalMessage.trim() !== this.state.welcomemessage.trim()) {
            Axios.post('/updateWelcome', {
                message: this.state.welcomemessage
            })
            .then( (response) => {
                console.log(response);
                this.setState({               
                    lastUpdate: response.data.date,
                    showUpdateMessage: "visible"
                });
                setTimeout(() => {
                    this.setState({ editMode: false, showUpdateMessage: "hide" });
                  }, 2000);
            }).catch( (error) => {
                console.log(error)
            });
        } else {
            this.setState({showUpdateMessage: "visible"});
            setTimeout(() => {
                this.setState({ editMode: false, showUpdateMessage: "hide" });
            }, 2000);
        }  
    }

    handleUpdateMessage(e) {
        this.setState({welcomemessage: e.target.value});
    }  
    
    moveCursorToEnd(e) {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    retrieveAnnouncements() {
        Axios.get('/getAnnouncements')
            .then((response) => {               
                this.setState({
                    announcements: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render(){
        return (
            <div>
                <div className="welcome">                   
                    {(this.props.adminMode === true && this.state.editMode === false) ?
                        <button 
                        className="editMessage"
                        onClick={this.handleEditClick}
                        >Edit
                        </button> :
                        ""
                    }
                    {this.state.editMode === true ? <h1 key={this.state.user.role}>Admin Mode - Welcome Message</h1> : ""}
                    <div> 
                        {this.state.editMode === true ?
                            <textarea                             
                            className="message_editable" 
                            name="message_editable"
                            autoFocus
                            onFocus={this.moveCursorToEnd}
                            onChange={this.handleUpdateMessage}
                            value={this.state.welcomemessage}
                            /> :
                            <pre className="message">{"  " + this.state.welcomemessage}</pre>
                        }                  
                    </div> 
                    <div className="editButtonContainer">
                        <p className={this.state.showUpdateMessage + " messageupdate"} >Message Updated</p>
                        {this.state.editMode != true ? <p className="welcomeupdate">Last Updated: {this.state.lastUpdate}</p> : "" }
                        {this.state.editMode === true ? <button className="cancelChange" onClick={this.handleCancel}>Cancel</button> : "" }
                        {this.state.editMode === true ? <button className="submitChange" onClick={this.handleSubmit}>Submit</button>  : "" }  
                    </div>
                </div>

                    {this.state.announcements !== "" ? this.state.announcements.map((value) => {
                        if(new Date(value.expiredate) >= this.state.today) {
                            return <Announcement key={"announcement"+value.id} data={value} />
                        }
                    }) : null}
               
            </div>
        );
    } 
    
    componentDidMount() {        
        this.dataSource.GetData(data => {
            this.setState({
                welcomemessage: data.message,
                lastUpdate: data.editdate,
                user: this.props.user
            });
        });
        this.retrieveAnnouncements();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user !== this.props.user) {
            this.setState({
                user: this.props.user
            })
            if(this.props.user === null) {
                this.setState({editMode: false})
            }
        }        
    }
    
}
