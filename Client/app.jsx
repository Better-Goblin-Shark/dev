import React, { Component } from 'react';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import LoginContainer from './containers/LoginContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';


class App extends Component{
    constructor(){
        super();
        //set default state for app load
        this.defaultState = {
            isLoggedIn: false,
            displayLoginDetails: false,
            displaySignupDetails: false,
        }
        this.state = this.defaultState;
        this.loginDetails = this.loginDetails.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.signupDetails = this.signupDetails.bind(this);
    }

    loginDetails(){
        //trigger the login popup box
        if (!this.state.displayLoginDetails){
            this.setState({displayLoginDetails: true});
        } else {
            this.setState({displayLoginDetails: false});
        }
    }

    signupDetails(){
        console.log('inside signupDetails func')
        //trigger the signup popup box
        if (!this.state.displaySignupDetails){
            this.setState({displaySignupDetails: true});
        } else {
            this.setState({displaySignupDetails: false});
        }
    }

    submitLogin(usernameText, passwordText, event){
        event.preventDefault();
        const submittedInfo = {username: usernameText.current.value, 
                               password: passwordText.current.value}
            console.log(submittedInfo.username + ' ' + submittedInfo.password)

        //test case for user log in
        if (submittedInfo.username === 'hello' && submittedInfo.password === 'world'){
            console.log('updating state')
            return this.setState({isLoggedIn: true})
        }

            // //Checking to see if username is in the database
            // fetch('http://localhost:3000/user',{
            //     method:'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(submittedInfo)
                
            // }
            // .then()//if response from server is true...
            // .catch((error) => {
            //     console.log('log-in-error:', error);
            // }))
            
            //NOW,
            //when we receive a response back from our post request
            //we can update state here and render the page differently
            //check res.locals.validLogin, if true, update state, then based on state
            //render:
            //  a <DashboardContainer /> instead of a <LoginContainer />
            //if the username/password was correct
    }

    submitSignup(usernameText, passwordText, ageText, heightText, sexText, weightText, event){
        event.preventDefault();
        //include goal-macros?
        const submittedInfo = {username: usernameText.current.value, 
                               password: passwordText.current.value,
                               age: ageText.current.value,
                               weight: weightText.current.value,
                               height: heightText.current.value,
                               sex: sexText.current.value}

            console.log(submittedInfo.username + ' ' + submittedInfo.password + ' ' + submittedInfo.age + ' ' + 
                submittedInfo.weight + ' ' + submittedInfo.height+ ' ' + submittedInfo.sex)

        //include goal-macros?    
        fetch('http://localhost:3000/user/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedInfo),
        })
    }

    render(){
        // this.state.isLoggedIn is false, render the LoginContainer
            //dashcontainer will have props of users-data
            {this.state.isLoggedIn ? <DashboardContainer /> : <LoginContainer />}
       
        return(
            <div>
                {this.state.isLoggedIn ? 
                <DashboardContainer />//if true, dashboard
                :
                <LoginContainer                   //if false, log in box (user, pws)
                    loginDetails = {this.loginDetails}
                    displayLoginDetails = {this.state.displayLoginDetails}//
                    submitLogin = {this.submitLogin}
                    signupDetails = {this.signupDetails}
                    displaySignupDetails = {this.state.displaySignupDetails}
                    submitSignup = {this.submitSignup}
                />

                }
            </div>
        )
    }
}

export default App;