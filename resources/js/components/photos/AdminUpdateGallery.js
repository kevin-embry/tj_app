import React from 'react';
import Axios from 'axios';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

class AdminUpdateGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            currentImage: 0,
            lightboxIsOpen: false,
            galleryNames: [],
            activeGallery: "",
            addImages: false
        }
        this.handleGalleryChange = this.handleGalleryChange.bind(this);
        this.handleAddImagesCheckbox = this.handleAddImagesCheckbox.bind(this);
    }

    handleAddImagesCheckbox(e) {
        this.setState({
            addImages: !this.state.addImages
        })
    }

    handleGalleryChange(e) {
        this.setState({activeGallery: e.target.value});
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
        console.log("OPENING LIGHTBOX: ", obj);
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true
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
        console.log("ACTIVE GALLERY: ", this.state.activeGallery);
        return (
            <div className="updateGallery">
                <h2>Update Gallery</h2>
                <div className="gallerySelection">
                    <label htmlFor="activeGallery">Select Gallery: </label>
                    {this.state.galleryNames && 
                        <select name="activeGallery" className="activeGallery" value={this.state.activeGallery} onChange={this.handleGalleryChange}>
                            {this.state.galleryNames.map(name => <option key={name}>{name}</option>)}
                        </select>
                    }
                    <label htmlFor="addImages">Add images to gallery: </label>
                    <input type="checkbox" name="addImages" className="addImages" value={this.state.addImages} onChange={this.handleAddImagesCheckbox} />
                </div>
               
                
                {this.state.images.length ? 
                    // <Gallery 
                    //     photos={photos}
                    //     onClick={() => console.log("CLICKED PHOTO")}
                    // />
                    <Gallery 
                        photos={photos}
                        onClick={this.openLightbox.bind(this)}
                    />
                : 
                <div className="no-images">
                    <h5>You currently have no images in your gallery</h5>
                </div> 
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

            // TODO:
            // 1) Make below Axios call into its own function "getPhotos" or something
            // 2) In componentDidMount call this function and pass in the gallery name
            // 3) Component did update call this function

    }
}

export default AdminUpdateGallery;