import React from 'react';
import GalleryViewer from './GalleryViewer';

class UserModule extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    render() {
        return (
            <div className="imageUserModule borderModule">
                <span 
                    onClick={ (e) => this.props.goHome(e)}
                    className="close" 
                    title="Close Add/Edit Photos"
                    >&times;
                </span>
                <h1>Thomas Jefferson Galleries</h1>
                <hr />
                <GalleryViewer 
                    adminMode={this.props.adminMode}
                />
            </div>
        )
    }
}

export default UserModule;