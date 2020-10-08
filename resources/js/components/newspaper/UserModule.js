import React from 'react';
import Gallery from 'react-photo-gallery';
import Axios from 'axios';

class UserModule extends React.Component {
    constructor(props) {
        super();
        this.state = {
            images: [],
            openImage: false,
            singleImage: ""
        }
    }

    retrieveNewspapers() {
        Axios.get('/getnewspapers')
            .then((response) => {
               console.log("RESPONSE: ", response);
               this.setState({images: response.data})
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }

    selectImage(e) {
        this.setState({
            openImage: !this.state.openImage,
            singleImage: e.target['src']
        })
    }

    closeImage() {
        this.setState({
            openImage: !this.state.openImage,
            singleImage: ""
        })
    }

    render() {
        let photos = this.state.images.map(image => {
            let selected = image.selected != null ? image.selected : false;
            return {
                src: image.url,
                width: image.width,
                height: image.height,
                id: image.id,
                selected: selected
            }
        });

        return (
            <div className="borderModule newspaperModule">
                <span 
                    onClick={ (e) => this.props.goHome(e)}
                    className="close" 
                    title="Close Newspapers"
                    >&times;
                </span>
                <h1>TJ in the News</h1>
                <h3>Articles about the Thomas Jefferson and sailors</h3>
                <hr />
                {!this.state.openImage && <Gallery 
                    photos={photos}
                    onClick={(e) => {this.selectImage(e)}}
                />}

                {this.state.openImage && 
                    <div className="userImage">
                        <a>
                            <span 
                                onClick={this.closeImage.bind(this)}
                                className="closeNewspaper" 
                                title="Close Newspaper Image"
                                >X
                            </span>
                            <img 
                                className="singleimage" 
                                src={this.state.singleImage}
                                title="Click For Full Size Image" 
                                onClick={(e) => window.open(this.state.singleImage, '_blank')}
                            />
                        </a>
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        this.retrieveNewspapers();
    }
}

export default UserModule;