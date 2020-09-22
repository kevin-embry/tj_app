import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/auth';
import { Redirect } from 'react-router-dom';
// import { RestDataSource } from '../webservice/RestDataSource';

function Authenticate(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setAuthTokens } = useAuth();
   
    const referer = props.location.state.referer || "/";

    function postLogin(e) {
        e.preventDefault();
        if (email !== "" && email !== null && password !== "" && password !== null) {
            const data = axios.post('/authenticate', { email, password })
            .then((response) => {  
                var date = new Date();               
                response.data.expire = date.setHours(date.getHours() + 4);
                setAuthTokens(response.data);
                setIsError(false);
                setLoggedIn(true);
            })
            .catch((error) => {  
                switch(error.response.status) {
                    case 404:
                        setErrorMessage("User not found or incorrect email/password")
                        break;
                    case 401:
                        setErrorMessage("User Not Approved. Check back later.")
                        break;    
                    default: 
                        setErrorMessage("Internal server error")
                        break;   
                }
                setIsError(true);
               
            })
        } else {           
            setIsError(true);  
        }
    }

    if(loggedIn) {        
        return <Redirect to={referer} />        
    }    
    
    function goHome() {
        props.history.push("/");
    }

    function ErrorMessage(props) {        
    return <b className={props.className}>{errorMessage}</b>        
    }
        
    return (
        <AuthContext.Provider value={{loggedIn: loggedIn, email: email, role: "admin"}}>
            <div className="authenticate">
                <h1>Login</h1>
                <form className="authform" onSubmit={postLogin}>
                    <div className="container">
                        
                        <label htmlFor="email"><b>Email</b></label>
                        <input 
                            type="text" 
                            className = {isError == true ? "loginerror" : ""}
                            placeholder="Enter Email" 
                            name="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }} 
                            required 
                            autoFocus
                        />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input 
                            type="password" 
                            className = {isError == true ? "loginerror" : ""}
                            placeholder="Enter Password"
                            value={password} 
                            name="password"
                            onChange={e => {
                                setPassword(e.target.value)
                            }} 
                            required 
                        />  

                        {isError == true ? <ErrorMessage className="errorDisplay"/> : ""} 
                       
                        <button 
                        type="submit"
                        className="submitlogin"
                        >Login</button>  
                    </div>

                    <div className="container">
                    <button 
                        type="button" 
                        onClick={goHome} 
                        className="cancelbtn"
                        >Cancel</button>
                    <span className="psw">Forgot <Link to="/forgotPassword">password?</Link></span>
                    </div>
                </form>
            </div>
        </AuthContext.Provider>
    );        
}

export default Authenticate;