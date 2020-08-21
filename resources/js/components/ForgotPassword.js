import React from 'react';
import Axios from 'axios';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: ""
        }

        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailInput(e){
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit() {
        console.log("EMAIL:", this.state.email);
        Axios.post("/recoverPassword", {
            email: this.state.email
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            // console.log(error.response.data.errors.email);
            this.setState({error: error.response.data.errors.email})
           
        })
    }

    render() {
      
        return (
            <div className="forgotPassword borderModule">
                <h1>Forgot Password</h1>
                <hr />
                <h3>Please enter your email below to reset your password.</h3>
                <h3>A code valid for 10 minutes will be sent to your email.</h3>
                <div className="passwordRecoverInput">
                    <label htmlFor="emailInput">Email: </label>
                    <input type="text" className="emailInput" value={this.state.email} onChange={this.handleEmailInput}/>
                </div>              
                {this.state.error && <div className="error">{this.state.error[0]}</div>}        
                <div className="passwordRecoverButton">
                    <button className="submitEmail" onClick={this.handleSubmit}>Submit</button>
                </div>
        
            </div>
        )
    }
}
export default ForgotPassword;