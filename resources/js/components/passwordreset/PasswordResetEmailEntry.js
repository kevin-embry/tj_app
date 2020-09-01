import React from 'react';

class PasswordResetEmailEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
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
        )
    }
}

export default PasswordResetEmailEntry;