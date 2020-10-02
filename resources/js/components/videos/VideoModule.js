import React from 'react';
import { VIDEOS } from '../../data/tjConstants';

class VideoModule extends React.Component {
    constructor(props) {
        super();
        this.state = {
            videoUrl: ""
        };

        this.redirectToHome = this.redirectToHome.bind(this);
    }

    redirectToHome(e) {
        this.props.history.push('/');
    }

    handleVideoChange(url) {
        this.setState({videoUrl: url})
    }

    render() {
        return(
            <div className="videomodule">
                <span 
                    onClick={this.redirectToHome}
                    className="close" 
                    title="Close Decklogs"
                >&times;
                </span>
                <div className="heading">
                    <h1>Thomas Jefferson Videos</h1>
                </div>
               
                <div className="siding">
                    <h3>Select Video To Play</h3>
                    <hr />
                    {VIDEOS.map((video) => {
                        return <div className="videoselect" key={video.url} onClick={() => this.handleVideoChange("https://www.youtube.com/embed/" + video.url)}>
                                    <img className="videothumbs" src={"https://img.youtube.com/vi/" + video.url + "/1.jpg"} />
                                    <p className="videodescription" >{video.description}</p>
                                </div>
                        })
                    }
                    
                </div>
                <div className="videoplayer">
                    {this.state.videoUrl == "" && <img className="player" src="..\..\..\images\american-flag.jpg"></img>}
                    {this.state.videoUrl !== "" && <iframe 
                                                        className="player" 
                                                        src={this.state.videoUrl} 
                                                        frameBorder="1" 
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                        allowFullScreen
                                                    /> }
                </div>
            </div>
        )
    }

}

export default VideoModule;