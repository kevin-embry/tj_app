import React from 'react';
import { AuthContext, useAuth } from '../context/auth';
import { RestDataSource } from '../webservice/RestDataSource';
import Axios from 'axios';


export default class Welcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
        if (this.state.originalMessage !== this.state.welcomemessage) {
            Axios.post('/updateWelcome', {
                message: this.state.welcomemessage
            })
            .then( (response) => {
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

    render(){
        return (
            <div>
                <div className="welcome">
                    {(this.state.user !== null && this.state.user.role === "admin" && this.state.editMode === false) ?
                        <button 
                        className="editMessage"
                        onClick={this.handleEditClick}
                        >Edit
                        </button> :
                        ""
                    }
                    {this.state.editMode === true ? <h1 key={this.state.user.role}>Admin Mode</h1> : ""}
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
    }

    componentDidUpdate(prevProps) {
        if(prevProps.user !== this.props.user) {
            this.setState({
                user: this.props.user
            })
        }        
    }
    
}
