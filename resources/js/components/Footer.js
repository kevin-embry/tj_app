import React from 'react';
import { RestDataSource } from '../webservice/RestDataSource';

export default class Footer extends React.Component {
    constructor(props){
        super(props)
        this.state = {lastUpdate: ""};

        this.dataSource = new RestDataSource("/getLastUpdate");   
    }    

    render(){        
        return (
            <div className="footer">
                <div className="contactus">
                    <a href="mailto:kevin.embry@example.com">Contact Us</a>
                </div>
               <div className="footercenter">
                   <p>Thomas Jefferson</p>
                   <p>2020</p>
               </div>
               <div className="lastupdate">
                    <p>Last Updated:</p>
                    <p>{this.state.lastUpdate}</p>
               </div>
            </div>
        );
    }  
    
    componentDidMount() {        
        this.dataSource.GetData(data => {
            this.setState({
                lastUpdate: data.lastupdate            
            });
        });
    }
}
