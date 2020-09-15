import React from 'react';
import Axios from 'axios';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: "",
            emailSubmitted: false,
            enterCode: false,
            resetCode: "",
            changePassword: false,
            newPassword1: "",
            newPassword2: "",
            success: false
        }

        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleResetCodeInput = this.handleResetCodeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetCodeSubmit = this.handleResetCodeSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updatePassword = this.updatePassword.bind(this);        
    }

    redirectToHome() {
        this.props.history.push('/');
    }

    handleEmailInput(e){
        this.setState({
            email: e.target.value
        })
    }

    handleResetCodeInput(e){
        this.setState({
            resetCode: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        Axios.post("/recoverPassword", {
            email: this.state.email
        })
        .then((response) => {
            this.setState({emailSubmitted: true, enterCode: true});
        })
        .catch((error) => {
            console.log(error);
            // this.setState({error: error.response.data.errors.email})
        })
    }

    handleResetCodeSubmit() {
        Axios.post("/checkToken", {
            resetToken: this.state.resetCode,
            email: this.state.email
        })
        .then((response) => {
            if (response.data === true || response.data === 1) {
                console.log("RESPONSE FROM BACKEND", response.data);
                this.setState({enterCode: false, changePassword: true})
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({error: ["The code did not match. Please check your email and try again."]});
        })
    }

    handlePasswordChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change); 
    }

    updatePassword(e) {
        e.preventDefault();
        Axios.post("/updatePassword", {
            email: this.state.email,
            password: this.state.newPassword1,
            password2: this.state.newPassword2
        })
        .then((response) => {
            console.log(response);
            this.setState({success: true});
            setTimeout(() => {
                this.setState({success: false});
                this.redirectToHome();
            }, 3000);
        })
        .catch((error) => {
            console.log(error.response.data.errors.password[0]);
            this.setState({error: error.response.data.errors.password});
            setTimeout(() => {
                this.setState({error: ""});
            }, 2500);
        });
    }

    render() {
        return (
            <div className="forgotPassword borderModule">
                <span 
                        onClick={this.redirectToHome.bind(this)}
                        className="close" 
                        title="Close Decklogs"
                    >&times;
                </span>
                <h1>Forgot Password</h1>
                <hr />
                {!this.state.emailSubmitted &&
                    <div>
                        <h3>Please enter your email below to reset your password.</h3>
                        <h3>A code valid for 10 minutes will be sent to your email.</h3>
                        <div className="passwordRecoverInput">
                            <label htmlFor="emailInput">Email: </label>
                            <input type="text" className="emailInput" value={this.state.email} onChange={this.handleEmailInput} />
                        </div>              
                        {this.state.error && <div className="error">{this.state.error[0]}</div>}        
                        <div className="forgotPasswordSubmit">
                            <button type="submit" className="submitEmail" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                }
                {this.state.enterCode &&
                    <div>
                        <h3>Please check your email.</h3>
                        <h3>Please enter the reset code below that was emailed to you. It is valid for 10 minutes only.</h3>
                        <div className="codeEntry">
                            <label htmlFor="resetCode">Enter Code: </label>
                            <input type="text" name="resetCode" className="resetCode" value={this.state.resetCode} onChange={this.handleResetCodeInput}/>
                        </div>              
                        {this.state.error && <div className="error">{this.state.error[0]}</div>}        
                        <div className="forgotPasswordSubmit">
                            <button className="submitEmail" onClick={this.handleResetCodeSubmit}>Submit</button>
                        </div>
                    </div>
                }
                {this.state.changePassword &&
                    <div className="changePasswordModule">
                        <h2>Enter Your New Password</h2>
                        <p>Enter New Password:</p>
                        <input type="password" name="newPassword1" className="newPasswordInput" value={this.state.newPassword1} onChange={this.handlePasswordChange} />
                        <p>Confirm New Password:</p>
                        <input type="password" name="newPassword2" className="newPasswordInput" value={this.state.newPassword2} onChange={this.handlePasswordChange} />
                        {this.state.newPassword1 !== this.state.newPassword2 && <p className="error text_center">Passwords Do Not Match</p>}
                {this.state.error && <p className="error text_center">{this.state.error[0]}</p>}
                        {this.state.success === true && <p className="valid text_center">Password Update Successful</p>}
                        <button 
                            type="submit" 
                            onClick={this.updatePassword} 
                            title="Change Password" 
                            disabled={(this.state.newPassword1 !== this.state.newPassword2) || this.state.newPassword1 == "" || this.state.newPassword2 == ""}
                            >Submit
                        </button>
                    </div>
                }
            </div>
        )
    }
}
export default ForgotPassword;