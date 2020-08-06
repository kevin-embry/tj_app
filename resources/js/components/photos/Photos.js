import React from 'react';
import AdminModule from './AdminModule';

class Photos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.redirectToHome = this.redirectToHome.bind(this);
    }

    redirectToHome() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="photos">
                {this.props.adminMode===true ? 
                    <AdminModule 
                        moduleName="images"                         
                        goHome={this.redirectToHome}
                    /> : null}
            </div>
        )
    }
}

export default Photos;