import React from 'react';
import GalleryViewer from './GalleryViewer';

class AdminUpdateGallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            // TODO: NEED TO SOMEHOW SEPERATE OUT THE GALLERY VIEWER FROM ALL 
            // OTHER UPDATE FUNCTIONALITY
            // TODO: ALSO NEED TO IMPORT THE NEW GALLERY COMPONENT INTO THIS 

            <div className="updateGallery">
                <GalleryViewer adminMode={this.props.adminMode} />
            </div>
        )
    }
}

export default AdminUpdateGallery;