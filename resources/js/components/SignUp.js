import React, { useState } from 'react';
import {CREWS, DIVISIONS, SERVEDDATES} from '../data/tjConstants'
import DataChecker from '../data/DataChecker';
import Axios from 'axios';

function SignUp(props) {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [servedOnBoard, setServedOnBoard] = useState("no");
    const [division, setDivision] = useState("");
    const [crew, setCrew] = useState("");
    const [job, setJob] = useState("");
    const [dateFrom, setDateFrom] = useState(1962);
    const [dateTo, setDateTo] = useState(1962);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(null);
    const [fnError, setFnError] = useState(false);
    const [lnError, setLnError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [servedYearsError, setServedYearsError] = useState(false);

    const divisions = [];
    Object.keys(DIVISIONS).forEach( (key) => {
        divisions.push(key.toLocaleUpperCase());
    })

    function handleChange(evt) {
        evt.target.name == "firstName" ? setFirstName(evt.target.value) : "";
        evt.target.name == "lastName" ? setLastName(evt.target.value) : "";
        evt.target.name == "email" ? setEmail(evt.target.value) : "";
        evt.target.name == "email" ? setEmail(evt.target.value) : "";
        evt.target.name == "servedOnBoard" ? setServedOnBoard(evt.target.value) : "";
        evt.target.name == "crewcolor" ? setCrew(evt.target.value) : "";
        evt.target.name == "division" ? setDivision(evt.target.value) : "";
        evt.target.name == "job" ? setJob(evt.target.value) : "";
        evt.target.name == "dateFrom" ? setDateFrom(Number(evt.target.value)) : "";
        evt.target.name == "dateTo" ? setDateTo(Number(evt.target.value)) : "";
        evt.target.name == "password1" ? setPassword1(evt.target.value) : "";
        evt.target.name == "password2" ? setPassword2(evt.target.value) : ""; 
    }
    
    function checkIfPasswordsMatch() {
       var checkPasswords = (password1 !== "" && password2 !== "" && (password1 === password2));
       if (checkPasswords) {
        setPasswordsMatch(true);
        setPasswordError(false);
        return true;
       } else {
        setPasswordsMatch(false);
        setPasswordError(true);
        return false;
       }
    }

    function goHome() {
        props.history.push("/");
    }

    function DatesSelect(props) {
        return (
           
                <div className="servedDates">
                <p>Select the dates you served:</p>
                <div className={servedYearsError == true ? "loginerror" : ""}>
                    <label htmlFor="dateFrom">Start Date: </label>
                    <select className="division" name="dateFrom" value={dateFrom} onChange={handleChange} >
                        {SERVEDDATES.map(date => 
                            <option key={"date" + date}>{date}</option>    
                        )};
                    </select>
                    <label htmlFor="dateTo">End Date: </label>
                    <select className="division" name="dateTo" value={dateTo} onChange={handleChange} >
                        {SERVEDDATES.map(date => 
                            <option key={"date" + date}>{date}</option>    
                        )};
                    </select>
                </div>
                
            </div> 
        )
    }

    function JobsSelect(props) {
        return (
            <div className="divisions">
                <p>Select your job:</p>
                <select className="job" name="job" value={job} onChange={handleChange}>
                    <option key="" value=""></option>
                    {props.jobs.map(val =>
                        <option key={val} value={val.toLowerCase()}>{val}</option>
                    )};
                </select>
            </div>
        );
    }

    function DivisionSelect(props) {
        return (
            <div className="divisions">
                <p>Select your division:</p>
                <select className="division" name="division" value={division} onChange={handleChange} > 
                    <option value=""></option>                          
                    {divisions.map(div =>
                    <option key={div} value={div.toLowerCase()}>{div}</option>
                    )};
                </select>
            </div> 
        )
    }

    function CrewColor(props) {
        return (
            <div>
                <p>Select your crew: </p>
                <p>
                    <select className="crewcolor" name="crewcolor" value={crew} onChange={handleChange}>
                        <option key="0" value=""></option>                           
                        {CREWS.map(color =>
                        <option key={color} value={color}>{color}</option>
                        )};
                    </select>
                </p>
            </div>
        )
    }

    function PasswordError(props) {
        return (
            <div>
                <p className="text_center error">Passwords Do Not Match And/Or Are Invalid</p>
            </div>
        )
    }

    function InfoError(props) {
        return (
            <div>
                <p className="text_center error">Correct Red Highlighted Fields </p>
            </div>
        )
    }

    function checkAllFields() {
       var errors = [];
       if(!DataChecker.checkFirstName(firstName)) {
            errors.push('first name');
            setFnError(true);
       } else {
           setFnError(false);
       };
        if(!DataChecker.checkLastName(lastName)) {
            errors.push('last name');
            setLnError(true);
        } else {
            setLnError(false);
        };
        if(!DataChecker.checkEmail(email)) {
            errors.push('email');
            setEmailError(true);
        } else {
            setEmailError(false);
        };
        if(!DataChecker.checkPassword(password2)) {
            errors.push('password');
            setPasswordError(true);
        } else {
            setPasswordError(false);
        };
        if(servedOnBoard === "yes" && !DataChecker.checkServedYears(dateFrom, dateTo)) {
            console.log("SERVED YEARS ERROR!");
            errors.push('served years');
            setServedYearsError(true);
        } else {
            setServedYearsError(false);
        };
        return errors;
    }

    function handleSubmit() {
        var doPasswordsMatch = checkIfPasswordsMatch();
        var errors = checkAllFields();
        if (doPasswordsMatch && errors.length == 0) {
           Axios.post("/register", {
               firstName: firstName.toLowerCase(),
               lastName: lastName.toLowerCase(),
               email: email,
               servedOnBoard: servedOnBoard,
               division: division,
               job: job,
               crew: crew,
               dateFrom: dateFrom,
               dateTo: dateTo,
               password: password2
           }).then( (response) => {
                console.log(response);
                alert("Your submission has been accepted. Please allow 24 to 48 hours for review/acceptance of your request. Thank you.");
                props.history.push("/");
           }).catch( (error) => {
               console.error(error);
           })
        } else {
            console.log("THERE ARE DATA ERRORS!");
        }
    }

    return (
        <div className="signup">
            <span 
                onClick={goHome}
                className="close" 
                title="Close SignUp"
                >&times;
            </span>
            <h1>Sign Up For Access</h1>
            <h3>Please fill out the following form for access to this website</h3>
            <h3>Your access is not immediate and will be granted upon approval of site webmaster</h3>
            <form className="signupForm">
                       
                <p>First Name: </p>
                <input 
                    type="text" 
                    className = {fnError == true ? "loginerror" : ""}
                    placeholder="Enter First Name" 
                    name="firstName"
                    value={firstName}
                    onChange={handleChange} 
                    required 
                    autoFocus
                />
                
                <p>Last Name: </p>
                <input 
                    type="text" 
                    className = {lnError == true ? "loginerror" : ""}
                    placeholder="Enter Last Name"
                    value={lastName} 
                    name="lastName"
                    onChange={handleChange} 
                    required 
                /> 
                
                <p>Email: </p>
                <input 
                    type="text" 
                    className = {emailError == true ? "loginerror" : ""}
                    placeholder="Enter Email"
                    value={email} 
                    name="email"
                    onChange={handleChange} 
                    required 
                /> 
                
                <p>Did You Serve On Board The Thomas Jefferson? </p>
                <p>
                    <select className="servedOnBoard" name="servedOnBoard" value={servedOnBoard} onChange={handleChange}>
                        <option key="no" value="no">No</option>
                        <option key="yes" value="yes">Yes</option>                                
                    </select>
                </p>

                {servedOnBoard === "yes" && <DatesSelect /> }
                
                {servedOnBoard === "yes" ? <CrewColor /> : ""}
                
                <div className="divisions_container">
                    {servedOnBoard === "yes" ? <DivisionSelect /> : ""}
                    {division !== "" ? <JobsSelect jobs={DIVISIONS[division]} /> : ""}
                </div>

               
                <div className="password_container">
                    <p>Please Select a Password: </p>
                    <input 
                        type="password" 
                        className = {passwordError == true ? "loginerror" : ""}
                        placeholder="Enter Password"
                        value={password1} 
                        name="password1"
                        onChange={handleChange} 
                        required 
                    /> 
                    <p>Repeat Password: </p>
                    <input 
                        type="password" 
                        className = {passwordError == true ? "loginerror" : ""}
                        placeholder="Repeat Password"
                        value={password2} 
                        name="password2"
                        onChange={handleChange} 
                        required 
                    /> 
                    {(fnError || lnError || emailError || servedYearsError) ? <InfoError /> : ""}
                    {(passwordsMatch !== null && passwordsMatch === false) ? <PasswordError /> : ""}
                </div>
                <button 
                type="button"
                className="submitlogin"
                onClick={handleSubmit}
                >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;