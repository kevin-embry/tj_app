import React from 'react';

class VideoModule extends React.Component {
    constructor() {
        super();
        this.state = {
            videoUrl: ""
        };
    }

    handleVideoChange(url) {
        console.log(url);
        this.setState({videoUrl: url})
    }

    render() {
        return(
            <div className="videomodule">
                <div className="heading">
                    <h1>Thomas Jefferson Videos</h1>
                </div>
               
                <div className="siding">
                    <h3>Select Video To Play</h3>
                    <hr />
                    <p><a href="#" onClick={() => this.handleVideoChange("https://www.youtube.com/embed/D3Kv_0MvoaI")}>USS Thomas Jefferson (SSBN-618)</a></p>
                    <p><a href="#" onClick={() => this.handleVideoChange("https://www.youtube.com/embed/Jw9lN8WLeJ4")}>Submarine Service In The 1970's</a></p>
                    <p><a href="#">Jefferson Link #3</a></p>
                    <p><a href="#">Jefferson Link #4</a></p>
                </div>
                <div className="videoplayer">
                    {this.state.videoUrl !== "" && <iframe 
                                                        className="player" 
                                                        src={this.state.videoUrl} 
                                                        frameborder="1" 
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowfullscreen
                                                    /> }
                </div>

            </div>
        )
    }
}

export default VideoModule;