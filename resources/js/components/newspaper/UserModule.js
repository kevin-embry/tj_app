import React from 'react';

class UserModule extends React.Component {
    constructor(props) {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="borderModule">
                <h1>TJ in the News</h1>
                <h3>Articles about the Thomas Jefferson and sailors</h3>
                <hr />
            </div>
        )
    }
}

export default UserModule;