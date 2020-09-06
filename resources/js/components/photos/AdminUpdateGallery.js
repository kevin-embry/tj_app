import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import Gallery from 'react-photo-gallery';
import Dropzone from 'react-dropzone';
import SelectedImage from "./SelectedImage"; 
// import GalleryViewer from './GalleryViewer';

class AdminUpdateGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            newImages: [],
            galleryNames: [],
            activeGallery: "",
            addImages: false,
            showImage: false,
            selectAll: false,
            selectedImages: [],
            selected_count: false
            
        }
        this.handleGalleryChange = this.handleGalleryChange.bind(this);
        this.handleAddImagesCheckbox = this.handleAddImagesCheckbox.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.deleteImages = this.deleteImages.bind(this);
       
    }

    deleteImages() {
        console.log("DELETING THESE MARKED IMAGES: ");
        this.state.images.map(image => {
            if(image.selected){
               console.log(image);
            }
        });
       
    }

    loadImages() {
        var selectedGallery = "";
        Axios.get('/galleryNames')
            .then((response) => {
                this.setState({galleryNames: response.data});
                if(Array.isArray(response.data) && response.data.length > 0) {
                    selectedGallery = response.data[0];
                    this.setState({activeGallery: selectedGallery});
                }
                this.retrieveImagesFromSelection(selectedGallery);
            })
            .catch((error) => {
                console.log("ERROR: ", error)
            })
    }

    handleAddImagesCheckbox(e) {
        this.setState({
            addImages: !this.state.addImages
        })
    }

    handleGalleryChange(e) {
        this.setState({
            activeGallery: e.target.value,
            currentImage: 0
        });
        this.retrieveImagesFromSelection(e.target.value);
    }

    retrieveImagesFromSelection(selectedGallery) {
        Axios.get('/photos', { params: { gallery: selectedGallery } })
            .then((response) => {
                const images = response.data;
                this.setState({ images: images })
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }

    onDrop(images) {
        this.setState ({
            newImages: this.state.newImages.concat([...images])
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
            newImages: this.state.newImages.filter((image) => {
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
        let newImages = this.state.newImages,
            config = {headers: { 'Content-Type': 'multipart/form-data'}},
            total_files = this.state.newImages.length,
            uploaded = 0;
        
        newImages.map( (image) => {
            let formData = new FormData();
            formData.append("file", image);
            formData.append("galleryname", this.state.activeGallery.toLowerCase().trim());
 
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
                            galleryName: "",
                            addImages: false
                        })
                    }
                    this.loadImages();
                })
                .catch((error) => {
                    this.buildErrors(error.response.data.errors); 
                    console.log("ERROR=> ", error);
                })
        });
    }

    selectImage(photo) {
        let images = this.state.images;
        images[photo.index].selected = !images[photo.index].selected;
        this.setState({
            images: images
        });
        this.verifyMarked();
      
    }

    verifyMarked(){
        let marked = false,
            mark_count = 0;
        this.state.images.map(image => {
            if(image.selected){
                marked = true;
                mark_count += 1;
            }
        });
        this.setState({
            selected_count : mark_count
        })
    }

    imageRenderer (obj){
        return (
            <SelectedImage
            margin={"2px"}
            index={obj.index}
            photo={obj.photo}
            left={obj.left}
            top={obj.top}
            selectSingleImage={this.selectImage.bind(this)}
            selected={obj.photo.selected}
          />
        )
    } 

    render() {
        let photos = this.state.images.map(image => {
            let selected = image.selected != null ? image.selected : false;
            return {
                src: '/storage/' + image.url,
                width: image.width,
                height: image.height,
                id: image.id,
                selected: selected
            }
        });
       
        return (
            <div className="updateGallery">

                <div className="gallerySelection">
                    <label htmlFor="activeGallery">Select Gallery: </label>
                    {this.state.galleryNames && 
                        <select name="activeGallery" className="activeGallery" value={this.state.activeGallery} onChange={this.handleGalleryChange}>
                            {this.state.galleryNames.map(name => <option key={name}>{name}</option>)}
                        </select>
                    }
                    
                    <label htmlFor="addImages">Add images to gallery: 
                        <input type="checkbox" name="addImages" className="addImages" value={this.state.addImages} onChange={this.handleAddImagesCheckbox} />
                    </label>
                     
                </div>

                {(!this.state.addImages && this.state.images.length) ? 
                    <div>
                        <p><b>Note: </b>Images do not open in admin mode</p>

                        {this.state.selected_count > 0  && 
                            <button 
                                onClick={(e) => { if (window.confirm('This action can not be reverted. Are You sure you wish to delete the selected image(s)?')) this.deleteImages(e)}}
                            >Delete {this.state.selected_count} Images</button>}

                        <Gallery 
                            photos={photos}
                            onClick={(e) => {this.selectImage}}
                            ImageComponent={this.imageRenderer.bind(this)}
                        />
                    </div> 
                    : null 
                }

                {this.state.addImages && 
                    <div>
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
                        {this.state.newImages.length > 0 && 
                            <button
                                className="upload_button"
                                onClick={this.uploadFiles.bind(this)}
                            >Upload
                            </button>
                        }    
                
                        {this.state.fileIncorrectError == true && <h4 className="error">Invalid image files. Upload only .jpeg or .png file extensions</h4>}
                        {this.state.newImages.length ?
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
                                    {this.state.newImages.map((file) => 
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
                }
            </div>
        )
    }

    componentDidMount() {
        // var selectedGallery = "";
        // Axios.get('/galleryNames')
        //     .then((response) => {
        //         this.setState({galleryNames: response.data});
        //         if(Array.isArray(response.data) && response.data.length > 0) {
        //             selectedGallery = response.data[0];
        //             this.setState({activeGallery: selectedGallery});
        //         }
        //         this.retrieveImagesFromSelection(selectedGallery);
        //     })
        //     .catch((error) => {
        //         console.log("ERROR: ", error)
        //     })
        this.loadImages();
    }
}

export default AdminUpdateGallery;