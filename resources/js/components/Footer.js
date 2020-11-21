import React from 'react';
import { RestDataSource } from '../webservice/RestDataSource';

export default class Footer extends React.Component {
    constructor(props){
        super()
        this.state = {lastUpdate: ""};
        this.dataSource = new RestDataSource("/getLastUpdate");   
    }    

    render(){        
        return (
            <div className="footer">
                <div className="contactus">
                    <img src="..\..\images\icons\mail-icon.svg" />
                    <a href="mailto:tj618history@gmail.com"><span>Contact Us</span></a>
                   
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
