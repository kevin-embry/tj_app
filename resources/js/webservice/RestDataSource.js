import Axios from "axios";

export class RestDataSource {
    constructor(base_url){
        this.BASE_URL = base_url;
    }

    GetData(callback) {
        this.SendRequest("get", this.BASE_URL, callback);
    }

    SendRequest(method, url, callback) {        
        Axios.request({
            method: method,
            url: url
        }).then(response => callback(response.data[0])
        ).catch(error => {
            console.log(error);
        });        
    }
} 