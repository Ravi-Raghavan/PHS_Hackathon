import React from 'react'
import Main from '/Users/raviraghavan/phs-project/src/Main/Main.js';
import Shelter from '/Users/raviraghavan/phs-project/src/Shelter/Shelter.js'
import Donate from '/Users/raviraghavan/phs-project/src/Donate/Donate.js'
import TwitterUpload from '/Users/raviraghavan/phs-project/src/Twitter/TwitterUpload.js'
import '/Users/raviraghavan/phs-project/src/Login/Login.css'
import App from '/Users/raviraghavan/phs-project/src/App/App.js'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {db} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
import {app} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
import {uiConfig} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
var user = firebase.auth().currentUser


class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            restaurants: []
        }
    }
    
    render(){
        return(
            <div>
                <h1>PROFILE</h1>
                { this.props.user} 
                {this.props.photo}
                
                <text><br/>DataBase</text>

            </div>
        )
    }
}
export default Profile