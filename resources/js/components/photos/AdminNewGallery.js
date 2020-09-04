import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

class AdminNewGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileIncorrectError: false,
            galleryName: "",
            failMessages: [],            
            images: [],
            progress: 0,
            uploading: false,
            uploaded: 0,
            supported_mime: [
                'image/jpeg',
                'image/png',
            ]
        }
        this.handleGalleryNameInput = this.handleGalleryNameInput.bind(this);
    }

    handleGalleryNameInput(e) {
        this.setState({galleryName: e.target.value});
    }

    onDrop(images) {
        this.setState ({
            images: this.state.images.concat([...images])
        });
    }

    onDropRejected(images) {
        if(images.length > 0) {
            this.setState({fileIncorrectError: true});
            setInterval(() => this.setState({fileIncorrectError: false}), 4000);       
        }
    }

    removeDroppedFile(preview, e = null) {
        this.setState({
            images: this.state.images.filter((image) => {
                return image.preview !== preview
            })
        })
        
    }

    calculateProgress(total_files, uploaded) {
        let calcProgress = (uploaded / total_files) * 100;
        this.setState({progress: calcProgress});
    }

    buildErrors(errorObject) {
        let errorArray = [];
        for (const [key, value] of Object.entries(errorObject)) {
            errorArray.push(value[0]);
        }
        this.setState({failMessages: errorArray});
    }

    uploadFiles() {
        let images = this.state.images,
            config = {headers: { 'Content-Type': 'multipart/form-data'}},
            total_files = this.state.images.length,
            uploaded = 0;
        
        images.map( (image) => {
            let formData = new FormData();
            formData.append("file", image);
            formData.append("galleryname", this.state.galleryName.toLowerCase().trim());
 
            Axios.post("/photos", formData, config)
                .then(response => {
                    console.log("RESPONSE: ", response);
                    this.setState({uploading: true}); 
                    const done = response.data;
                    if(done){
                        this.removeDroppedFile(image.preview);
                        this.calculateProgress(total_files, ++uploaded);
                        this.setState({uploaded: uploaded});
                    }
                    if(this.state.progress == 100) {
                        this.setState({
                            uploading: false, 
                            progress: 0,
                            galleryName: ""
                        })
                    }
                })
                .catch((error) => {
                    this.buildErrors(error.response.data.errors); 
                    console.log("ERROR=> ", error);
                })
        });
    }

    render() {
        return (
            <div className="uploader">
                    <div className="galleryNameContainer">
                        <label htmlFor="newGalleryName"><b>New Gallery Name:</b>
                            <input 
                                name="newGalleryName" 
                                type="text" 
                                className="newGalleryName"
                                placeholder="Enter Gallery Name"
                                title="Gallery Name"
                                value={this.state.galleryName}
                                onChange={this.handleGalleryNameInput} />
                        </label>
                        <p><b>Note:</b> Gallery names should be letters and numbers and between 4 to 25 characters</p> 
                        {this.state.failMessages && this.state.failMessages.map(error => <h3 className="error">{error}</h3>)}
                    </div>
                   
                  
                    <label htmlFor="dropzone_button">Select one or more images. Push button below:</label>
                    <Dropzone
                        onDropAccepted={this.onDrop.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        className="dropzone_button"
                        accept={this.state.supported_mime}
                        title="Select button or drop images here"
                    >Select Images
                    </Dropzone>
                    <p>Images should be no larger than 5MB</p>
                    {this.state.images.length > 0 && 
                        <button
                            className="upload_button"
                            onClick={this.uploadFiles.bind(this)}
                        >Upload
                        </button>
                        }    
                
                {this.state.fileIncorrectError == true && <h4 className="error">Invalid image files. Upload only .jpeg or .png file extensions</h4>}
                {this.state.images.length ?
                    <Fragment>
                        {this.state.uploading === true &&
                            <div className="progress">
                                <div 
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{width: this.state.progress+"%"}}
                                    aria-valuenow={this.state.progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {this.state.progress > 15 && <span>{Math.round(this.state.progress)+"%"}</span>}
                                </div>
                                
                            </div>
                        }
                        {this.state.progress === 100 && <h3>Upload Complete</h3>}
                        <hr/>
                        <div className="images">
                            {this.state.images.map((file) => 
                                <div key={file.preview} className="image">
                                    <span
                                        className="close"
                                        onClick={this.removeDroppedFile.bind(this, file.preview)}
                                        title="Remove Image"
                                    >X</span>
                                    <img src={file.preview} alt=""/>
                                </div>
                                )
                            }
                        </div>
                    </Fragment>
                    :
                    <div className="no-images">
                        <h4>Selected images will appear here</h4>
                    </div>    
                }
            </div>
        )
    }
}

export default AdminNewGallery;