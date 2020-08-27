import React from 'react';
import Axios from 'axios';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: "",
            emailSubmitted: false,
            resetCode: ""
        }

        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleResetCodeInput = this.handleResetCodeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetCodeSubmit = this.handleResetCodeSubmit.bind(this);
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

    handleSubmit() {
        // console.log("EMAIL:", this.state.email);
        Axios.post("/recoverPassword", {
            email: this.state.email
        })
        .then((response) => {
            this.setState({emailSubmitted: true});
            console.log(response.data);
        })
        .catch((error) => {
            // console.log(error.response.data.errors.email);
            this.setState({error: error.response.data.errors.email})
        })
    }

    handleResetCodeSubmit() {
        Axios.post("/checkToken", {
            resetToken: this.state.resetCode,
            email: this.state.email
        })
        .then((response) => {
           
            console.log("RESPONSE FROM BACKEND", response.data);
        })
        .catch((error) => {
            console.log(error);
           
        })
    }

    render() {
        return (
            <div className="forgotPassword borderModule">
                <h1>Forgot Password</h1>
                <hr />
                {!this.state.emailSubmitted &&
                    <div>
                        <h3>Please enter your email below to reset your password.</h3>
                        <h3>A code valid for 10 minutes will be sent to your email.</h3>
                        <div className="passwordRecoverInput">
                            <label htmlFor="emailInput">Email: </label>
                            <input type="text" className="emailInput" value={this.state.email} onChange={this.handleEmailInput}/>
                        </div>              
                        {this.state.error && <div className="error">{this.state.error[0]}</div>}        
                        <div className="forgotPasswordSubmit">
                            <button className="submitEmail" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                }
                {this.state.emailSubmitted &&
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
            </div>
        )
    }
}
export default ForgotPassword;