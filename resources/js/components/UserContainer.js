import React from 'react';

export default class UserContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "Guest",
            isAdmin: false,
            adminMode: false
        }
    }

    render() {
        const buttonValue = this.state.adminMode === true ? "TURN OFF ADMIN MODE" : "TURN ON ADMIN MODE";
        return (
            <div className="userContainer">
                <p>Welcome {this.state.firstName}
                {this.state.isAdmin === true ? 
                    <button
                        onClick={this.props.adminModeCallback}
                >{buttonValue}</button> : ""}
                </p>          
            </div>          
        )
    }

    componentDidMount(){
        if (this.props.user !== null) {
            this.setState({firstName: this.props.user.firstName});             
            this.props.user.role === "admin" ? this.setState({isAdmin: true}): this.setState({isAdmin: false});
        } 
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            if(this.props.user !== null) {          
                this.setState({firstName: this.props.user.firstName});
                this.setState({adminMode: this.props.adminMode});             
                this.props.user.role === "admin" ? this.setState({isAdmin: true}): this.setState({isAdmin: false});
            } else {
                this.setState({
                    firstName: "Guest",
                    isAdmin: false
                });
            }
        } 
    }
}
