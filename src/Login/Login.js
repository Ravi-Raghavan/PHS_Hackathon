import React from 'react'
import Main from '/Users/raviraghavan/phs-project/src/Main/Main.js';
import Shelter from '/Users/raviraghavan/phs-project/src/Shelter/Shelter.js'
import Donate from '/Users/raviraghavan/phs-project/src/Donate/Donate.js'
import TwitterUpload from '/Users/raviraghavan/phs-project/src/TwitterUpload.js'
import '/Users/raviraghavan/phs-project/src/Login/Login.css'
import App from '/Users/raviraghavan/phs-project/src/App.js'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Profile from '/Users/raviraghavan/phs-project/src/Profile/Profile.js'
import {app} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
import {db} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
import {uiConfig} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
/*firebase.initializeApp({
  apiKey: "AIzaSyB0R3XWNRlNPyM2nkuWvwfKqjJIvSZ-U2A",
  authDomain: "phsproject-40dfd.firebaseapp.com",
  databaseURL: "https://phsproject-40dfd.firebaseio.com",
  storageBucket: "gs://phsproject-40dfd.appspot.com"
})
var database = firebase.database()*/
var user = firebase.auth().currentUser
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isSignedIn: false
    }
    this.isActive = this.isActive.bind(this)
    this.passwordInputChange = this.passwordInputChange.bind(this)
    this.usernameInputChange = this.usernameInputChange.bind(this)
    this.writeUserData = this.writeUserData.bind(this)
  }
  /*uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ], 
    callbacks: {
      signInSuccess: () => console.log("SUCCESS!!!!")
    }
  }*/
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: !!user
      })
    })
  }
  writeUserData(userId, name){
    db.ref('users/' + firebase.auth().currentUser.displayName).set({
      username: name,
      restaurants: {}
    })
  }
 
    isActive(method){
      if(this.state.login_method === method){
        return 'active'
      }
      else{
        return ''
      }
    }
    changeMethod(method){
      this.setState({
        login_method: method
      })
    }
    
    
    passwordInputChange(event){
      this.setState({
        password: event.target.value
      })
    }
    usernameInputChange(event){
      this.setState({
        username: event.target.value
      })
    }
  displayData(event){
    var child_names = []
    var restRef = db.ref('users/' + firebase.auth().currentUser.displayName + "/restaurants").orderByKey()
    restRef.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key
        var name = childSnapshot.val().name
        child_names.push(name)
    })
})
    return child_names.map(child_name => {
    return <li>{child_name}</li>
    })
  }
  render(){
    return(
      <div class = "Main">

        <div class = "UserEnter">
          <text>Make the Most Of Your Money</text>
          <div class = "Social">
                {this.state.isSignedIn 
                ? (
                  <div>
                  <h1>Welcome {firebase.auth().currentUser.displayName}</h1> 
                  <img class = "profImage" alt = "profile picture" src = {firebase.auth().currentUser.photoURL} width = "100" height = "100"/>                  
                  <div>
                  <button class = "signOut" onClick = {() => firebase.auth().signOut() }  >SIGN OUT!</button>
                  </div>
                  {/*<button class = "signOut" onClick = {() => firebase.auth().signOut()}>SIGN OUT!</button>*/}
                  {this.writeUserData(firebase.auth().currentUser.uid,firebase.auth().currentUser.displayName)}                  
                  </div>
                ): (
                  <StyledFirebaseAuth class = "Special_Login" 
                  uiConfig = {uiConfig}
                  firebaseAuth ={firebase.auth()}
                  />
                )
                } 
        </div>
        </div>
        <div class = "Subtext">
                <text>Secure Payments</text>
                <text>Simple and Convenient</text>
                <text >Acquire Many Rewards</text>
          </div>
        <div class = "MoreInfo">
          <div class = "icon">
            <img src = "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/home/module3-icon-1.png"></img>
            <img src = "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/home/module3-icon3.png"></img>
            <img src = "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/home/module3-icon-2.png"></img>
          </div>
        </div>
        <div class = "AppDescription">
          <img src = "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/c3/26/be/c326be44-276e-855c-6b67-5b8853640374/pr_source.png/300x0w.jpg"></img>
          <img src = "https://cdn.macrumors.com/article-new/2014/09/applepaypassbook.jpg"></img>
          <img></img>
        </div>
        <div class = "UserInformation">
          <text>Send, Donate,and Receive Money With Your Account</text>
        </div>
        
        <div class = "Media">
          <img class = "PayPalIMG" src = 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg'></img>
          <text class = "Welcome-Text">Sign In to Get Started!</text>
        </div>
      </div>
      
            
        )
    }
}
export default Login;