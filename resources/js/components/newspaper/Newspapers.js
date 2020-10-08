import React from 'react';
import AdminModule from './AdminModule';
import UserModule from './UserModule';

class Newspapers extends React.Component {
    constructor(props) {
        super();
       
        this.redirectToHome = this.redirectToHome.bind(this);
    }

    redirectToHome() {
        this.props.history.push("/");
    }


    render() {
        return (
            <div className="">
                {this.props.adminMode===true ? 
                    <AdminModule 
                        adminMode={this.props.adminMode}                         
                        goHome={this.redirectToHome}
                    />
                    :
                    <UserModule
                        adminMode={this.props.adminMode}
                        goHome={this.redirectToHome}
                    />
                }    
            </div>
        )
    }
}

export default Newspapers;