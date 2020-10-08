import React from 'react';
import Axios from 'axios';
import Gallery from 'react-photo-gallery';
import SelectedImage from "../photos/SelectedImage"; 

class EditModule extends React.Component {
    constructor(props) {
        super();
        this.state = {
            images: [],
            selected_count: false
        };

        this.selectImage = this.selectImage.bind(this);
        this.deleteImages = this.deleteImages.bind(this);
    }

    deleteImages() {
        this.state.images.map(image => {
            if(image.selected){
               console.log(image);
               Axios.post('/deletenewspaper', {
                   image: image
               })
               .then((response) => {
                   console.log(response);
                   this.retrieveNewspapers(); 
                   if(response.data.status == "success") {
                       this.setState({selected_count: 0})
                        // this.retrieveNewspapers(); 
                   }
               })
               .catch((error) => {
                   console.log(error);
               })
            }
        });
       
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
                src: image.url,
                width: image.width,
                height: image.height,
                id: image.id,
                selected: selected
            }
        });

        return (
            <div className="update_module">
                {(!this.state.addImages && this.state.images.length) ? 
                    <div>
                        <h3><b>Note: </b>Images do not open in admin mode</h3>
                        <p>Select images to mark for deletion</p>

                        {this.state.selected_count > 0  && 
                            <button 
                                className="deleteImages"
                                title="Delete Selected Images"
                                onClick={(e) => { if (window.confirm('This action can not be reverted. Are You sure you wish to delete the selected image(s)?')) this.deleteImages(e)}}
                            >Delete {this.state.selected_count} Image(s)</button>}

                        <Gallery 
                            photos={photos}
                            onClick={(e) => {this.selectImage}}
                            ImageComponent={this.imageRenderer.bind(this)}
                        />
                    </div> 
                    : null 
                }
            </div>
        )
    }

    componentDidMount() {
        this.retrieveNewspapers();
    }
        
}

export default EditModule;