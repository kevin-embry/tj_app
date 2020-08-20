import React from 'react';
import Axios from 'axios';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

class GalleryViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            currentImage: 0,
            lightboxIsOpen: false,
            galleryNames: [],
            activeGallery: "",
            addImages: false,
            showImage: false,
            individualImage: ""
        }
        this.handleGalleryChange = this.handleGalleryChange.bind(this);
        this.handleAddImagesCheckbox = this.handleAddImagesCheckbox.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);

        console.log(props);
        
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

    openLightbox(e, obj) {
        console.log("OPENING IMAGE: ", obj);
        // this.setState({
        //     showImage: true,
        //     individualImage: obj.photo.src
        // });

        // this.setState({
        //     currentImage: obj.index,
        //     lightboxIsOpen: true
        // });
        this.setState({
            currentImage: obj.index,
            showImage: true
        });
       
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    goToPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    goToNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    render() {
        let photos = this.state.images.map(image => {
            return {
                src: '/storage/' + image.url,
                width: image.width,
                height: image.height,
                id: image.id
            }
        });
      
        return (
            <div className="galleryViewer">
               
                <div className="gallerySelection">
                    <label htmlFor="activeGallery">Select Gallery: </label>
                    {this.state.galleryNames && 
                        <select name="activeGallery" className="activeGallery" value={this.state.activeGallery} onChange={this.handleGalleryChange}>
                            {this.state.galleryNames.map(name => <option key={name}>{name}</option>)}
                        </select>
                    }
                    
                    {this.props.adminMode===true &&
                        <label htmlFor="addImages">Add images to gallery: 
                            <input type="checkbox" name="addImages" className="addImages" value={this.state.addImages} onChange={this.handleAddImagesCheckbox} />
                        </label>
                    }
                     {this.props.adminMode && <p><b>Note: </b>Images do not open in admin mode</p>}
                </div>

                { (this.state.showImage && this.props.adminMode === false) && 
                    <div className="showImage">
                        {/* <p>Click photo to enlarge</p> */}
                        {this.state.currentImage < this.state.images.length - 1 && 
                            <img className="rightImageScroll" src="../../images/icons/rightarrow_small.png" onClick={this.goToNext.bind(this)} />
                        }                        
                        
                        {this.state.currentImage > 0 && 
                            <img className="leftImageScroll" src="../../images/icons/leftarrow_small.png" onClick={this.goToPrevious.bind(this)} />
                        }
                       
                        <a href={photos[this.state.currentImage].src} target="_blank" title="Click photo to enlarge">
                            <img className="individualImage" src={photos[this.state.currentImage].src} />
                        </a>
                        <hr />
                    </div>
                }

                {/* TODO: NEED TO SEPERATE OUT THIS INTO ITS OWN COMPONENT */}
                
                {this.state.images.length ? 
                    // <Gallery 
                    //     photos={photos}
                    //     onClick={this.openLightbox.bind(this)}
                    // />
                    <Gallery                        
                        photos={photos}
                        onClick={this.openLightbox.bind(this)}
                    />
                    : 
                    <div className="no-images"><h5>You currently have no images in your gallery</h5></div> 
                }

                {/* <Lightbox 
                    images={photos}
                    onClose={this.closeLightbox.bind(this)}
                    onClickPrev={this.goToPrevious.bind(this)}
                    onClickNext={this.goToNext.bind(this)}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                /> */}

            </div>
        )
    }

    componentDidMount() {
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
}

export default GalleryViewer;