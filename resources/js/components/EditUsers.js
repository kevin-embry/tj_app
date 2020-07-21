import React from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import EditUsersLine from '../fragments/EditUsersLine';

export default class EditUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            approved: "",
            showTable: "componentVisible",
            showEditUser: "componentHide",
            userUpdateFailed: "componentHide",
            userUpdateSuccess: "componentHide",
            userDelete: "componentHide"
        }

        this.retrieveUsers();
        this.editUser = this.editUser.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goHome = this.goHome.bind(this);
     
    }

    retrieveUsers() {
        Axios.get('/getAllUsers')
            .then( (response) => {
                this.setState({
                    users: response.data
                });
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    handleEditUser(e) {   
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);        
    }

    handleUpdate(e) {
        Axios.post('/updateUser', {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.role,
            approved: this.state.approved 
        })
        .then( (response) => {
            console.log(response);
            this.setState({userUpdateSuccess: "componentVisible"});
            setTimeout(() => {
                this.setState({ userUpdateSuccess: "componentHide" });
                this.props.newUserCallback();
                this.retrieveUsers();
                this.closeEdit();
            }, 2500);
            
        })
        .catch( (error) => {
            console.log("AN ERROR OCCURED");
            console.log(error);
            this.setState({userUpdateFailed: "componentVisible"});
            setTimeout(() => {
                this.setState({ userUpdateFailed: "componentHide" });
            }, 2500);
        });
    }

    handleDelete(e) {
        Axios.post('/deleteUser', {
            id: this.state.id,
            email: this.state.email
        })
        .then( (response) => {
            console.log(response);
            this.setState({userDelete: "componentVisible"});
            setTimeout(() => {
                this.setState({ userDelete: "componentHide" });
                this.retrieveUsers();               
                this.closeEdit();
            }, 3000);
            
        })
        .catch( (error) => {
            console.log("AN ERROR OCCURED");
            console.log(error);
            this.setState({userUpdateFailed: "componentVisible"});
            setTimeout(() => {
                this.setState({ userUpdateFailed: "componentHide" });
            }, 2500);
        });
    }

    editUser(props) {
        this.setState({
            id: props.id,
            firstName: props.firstname,
            lastName: props.lastname,
            email: props.email,
            role: props.role,
            approved: props.approved,
            showTable: "componentHide",
            showEditUser: "componentVisible"
        });
    }

    closeEdit() {
        this.setState({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            approved: "",
            showTable: "componentVisible",
            showEditUser: "componentHide"
        });
    }

    goHome() {
        this.props.history.push("/");
    }

    render() {
        const tableHeader = ["Last Name","First Name","Email Address","Created Date","Role","Approved"];
        return (
            <div className="editusers">
            <span 
                onClick={this.goHome}
                className="close" 
                title="Close Edit Users"
            >&times;
            </span>
              <h1>Admin Mode - Users</h1>

              <div className={this.state.showTable}> 
                <h2>All users to approve will appear at the top</h2>  
                <table className="userTable">
                    <thead>
                        <tr>
                        {tableHeader.map(header => <th key={"editheader"+header}>{header}</th>)}
                        </tr>                   
                    </thead>
                    <tbody>
                    {this.state.users.map(user => <tr key={"editrow"+user.email}><EditUsersLine {...this.props} user={user} editUserCallback={this.editUser}/></tr> )}                    
                    </tbody>
                </table>
              </div> 

              <div className={this.state.showEditUser}>
                  <h1>Update User</h1>
                  <div className="editSingleUser" >
                      <p>ID: </p>
                      <input readOnly value={this.state.id} />
                      <p>First Name:</p>
                      <input name="firstName" value={this.state.firstName} onChange={this.handleEditUser}></input>
                      <p>Last Name:</p>
                      <input name="lastName" value={this.state.lastName} onChange={this.handleEditUser}></input>
                      <p>Email: </p>
                      <input name="email" value={this.state.email} onChange={this.handleEditUser}></input>
                      <p>Role:</p>
                      <select name="role" value={this.state.role} onChange={this.handleEditUser}>
                          <option>user</option>
                          <option>admin</option>
                      </select>
                      <p>Approved:</p>
                      <select name="approved" value={this.state.approved} onChange={this.handleEditUser}>
                          <option>false</option>
                          <option>true</option>
                      </select>
                      <div className="editButtonContainer">
                          
                        <button 
                            className="updatebutton"
                            title="Update User" 
                            onClick={this.handleUpdate}
                        >Update
                        </button>

                        <button 
                            className="cancelbutton" 
                            title="Cancel Edit"
                            onClick={this.closeEdit}
                        >Cancel
                        </button>

                        <button 
                            className="deletebutton"
                            title="Delete User" 
                            onClick={(e) => { if (window.confirm('This action can not be reverted. Are You sure you wish to delete this user?')) this.handleDelete(e)}}
                        >Delete
                        </button>

                      </div>
                    <p className={"error text_center " + this.state.userUpdateFailed}>User Update Failed</p> 
                    <p className={"valid text_center " + this.state.userUpdateSuccess}>User Updated</p>  
                    <p className={"error text_center " + this.state.userDelete}>User Deleted</p>  
                  </div>         
              </div>
            </div>
        )
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            // this.props.adminMode === false ? this.props.history.push("/") : null;
            console.log("COMPONENT UPDATED!");
            this.props.adminMode === false ? this.goHome() : null;
        }
    }
}