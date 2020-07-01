import React from 'react';

class Announcement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            postDate: props.postDate,
            message: props.message,
            expireDate: props.expireDate
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="announcement">
                <img src="../../images/icons/horn_icon.png"></img>
                <p>{this.props.data.message}</p>
                <span className="expires">Expires: {this.props.data.expiredate}</span>
            </div>
        )
    }
}

export default Announcement;