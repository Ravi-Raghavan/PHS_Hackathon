import React from 'react';
import Main from '/Users/raviraghavan/phs-project/src/Main/Main.js';
import Shelter from '/Users/raviraghavan/phs-project/src/Shelter/Shelter.js'
import Donate from '/Users/raviraghavan/phs-project/src/Donate/Donate.js'
import TwitterUpload from '/Users/raviraghavan/phs-project/src/TwitterUpload.js'
import Login from '/Users/raviraghavan/phs-project/src/Login/Login.js'
import '/Users/raviraghavan/phs-project/src/App.css'
import Profile from '/Users/raviraghavan/phs-project/src/Profile/Profile.js'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {app} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
import {db} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
import {uiConfig} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
var firebaseAPP = app
var user = firebase.auth().currentUser
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Option: "Home",
            isSignedIn: false,
            isRegistering: false,
            isLoggingIn: false,
            email: "",
            pass: "",
            error:"",
            username: ""
        }
        this.isActive = this.isActive.bind(this)
        this.writeUserData = this.writeUserData.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.onButtonPress = this.onButtonPress.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.passChange = this.passChange.bind(this)
        this.onceCredentials = this.onceCredentials.bind(this)
        this.onceUser = this.onceUser.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.combinedTask = this.combinedTask.bind(this)
        this.loginPress = this.loginPress.bind(this)
        this.viewPassword = this.viewPassword.bind(this)
        this.alertFunction = this.alertFunction.bind(this)
        this.displayEmailValidation = this.displayEmailValidation.bind(this)
        this.displayPasswordValidation = this.displayPasswordValidation.bind(this)
        this.displayNotification = this.displayNotification.bind(this)
        this.displayErrors = this.displayErrors.bind(this)
        //this.renderComponent = this.renderComponent.bind(this)
        //this.changeOption = this.changeOption.bind(this)
        this.resetError = this.resetError.bind(this)
        this.usernameChange = this.usernameChange.bind(this)
    }
    isActive(option){
        if(this.state.Option === option){
            return 'active'
        }
        else {
            return ''
        }
    }
    changeOption(option){
        this.setState({
            Option: option
        })
    }
    renderComponent(){
        if(this.isActive("Home")){
            return <Main />
        }
        else if(this.isActive("Search")){
            return <Shelter user = {firebase.auth().currentUser.displayName}/>
        }
        else if(this.isActive("Donate")){
            return <Donate />
        }
        else if(this.isActive("Restaurant")){
            return <TwitterUpload />
        }
        else if(this.isActive("Login")){
            return <Login />
        }
        else if(this.isActive("Profile")){
            return <Profile user = {firebase.auth().currentUser.displayName} photo = {firebase.auth().currentUser.photoURL} />
        }
    }
    
    componentDidMount = () => {
        //var data = this.state.isLoggingIn
        app.auth().onAuthStateChanged(user => {
          this.setState({
            isSignedIn: !!user
          })
        })
        if('querySelector' in document) {

            // get all messages
            var messageComponents = document.querySelectorAll("[data-message]");
        
            // if at least one message is in the DOM
            if (messageComponents.length > 0) {
                // loop over each message
                [].forEach.call(messageComponents, function (message) {
                    var messageButton = message.querySelector("[data-closenotification]");
                    // show the close button 
                    messageButton.removeAttribute('hidden');
        
                    // on click hide the message
                    messageButton.addEventListener("click", function () {
                        this.parentElement.hidden = true;
                    });
                });
            }
        }
      }
      writeUserData(userId, name){
        if(this.state.username === ''){
            db.ref('users/' + firebase.auth().currentUser.displayName).set({
                username: name,
                restaurants: {}
              })
        }
        else{
            db.ref('users/' + this.state.username).set({
                username: name,
                restaurants: {}
              })
        }
      }
    usernameChange(event){
        this.setState({
            username: event.target.value
        })
    }
    onButtonPress(event){
        this.setState({
            isRegistering: true
        })
        
    }
    emailChange(event){
        this.setState({
            email:event.target.value
        })
    }
    passChange(event){
        this.setState({
            pass: event.target.value
        })
    }
    onceCredentials(event){
        var self = this
        //window.prompt("Entered Method")
        var new_email = this.state.email
        var new_password = this.state.pass
        window.prompt(new_email)
        window.prompt(new_password)
        app.auth().createUserWithEmailAndPassword(new_email, new_password).then(function(user){
            window.prompt("Everything went fine. User has been created")
            
        }).catch(function(error){
            self.setState({
                error: error.message
            })
            window.prompt(error.message)
        })
        window.prompt("This function has successfully been called")
        event.preventDefault()
    }
    onceUser(event){
        var self = this
        var email = this.state.email
        var password = this.state.pass
        window.prompt(email)
        window.prompt(password)
        app.auth().signInWithEmailAndPassword(email, password).then(function(user){
            window.prompt("Everything went fine. User has been logged in")
            
        }).catch(function(error){
            self.setState({
                error: error.message
            })
            window.prompt(error.message)
            //document.getElementById('strong').innerHTML = error.message
        })
        //window.prompt("This function has successfully been called")
        event.preventDefault()
    }
    combinedTask(){
        app.auth().signOut()
        this.setState({
            isRegistering:false,
            isLoggingIn: false
        })
    }
    loginPress(event){
        this.setState({
            isLoggingIn: true
        })
    }
    viewPassword(){
        var passType = document.getElementById('password')
        var buttonType = document.getElementById('masking')
        if(buttonType.innerText === 'Show Password'){
            buttonType.innerText = ' Hide Password'
        }
        else if(buttonType.innerText === 'Hide Password'){
            buttonType.innerText = 'Show Password'
        }
        //window.prompt(passType)
        if (passType.type === 'password'){
            passType.type = 'text';
        }
        else{
            passType.type = 'password';
        }
    }
    alertFunction(){
        var x = document.getElementById('errorMessage')
        if(x.style.display === "none"){
            x.style.display = "block";
        }
        else{
            x.style.display = "none"
        }
    }
    displayEmailValidation(){
        //var x = document.getElementById('errorEmail')
        var currentEmail = this.state.email
        if(!currentEmail.includes("@") || currentEmail.match(/.com|.org/) == null){
            return(
                <p role="alert" className="form__error" id="errorEmail">Please use a valid email address.</p>
            )
        }
        
    }
    displayPasswordValidation(){
        var password = this.state.pass
        if(password.replace(/\s/g, "").length <8){
            return (
                <p className="form__hint" id="passwordHint">The password must be at least 8 characters long.</p>
            )
        }

    }
    displayNotification(){
        var text = ''
        if(!(window.Notification)){
            alert("Doesn't support notifications")
        }
        else{
            if(Notification.permission === 'granted'){
                
                if(this.state.username === ''){
                    text = app.auth().currentUser.displayName
                }
                else{
                    text = this.state.username
                }
                var notify = new Notification("New Notification", {
                    body: "Hi there, " + text + ", Welcome!"
                })
            }
            else{
                if(this.state.username === ''){
                    text = app.auth().currentUser.displayName
                }
                else{
                    text = this.state.username
                }
                Notification.requestPermission().then(function(p){
                    if(p === 'granted'){
                        var notify = new Notification("New Notification", {
                            body: "Hi there, " + text + ", Welcome!"
                        })
                    }
                })
            }
        }
        //window.prompt("Notification Permission: " + Notification.permission)
    }
    resetError(){
        this.setState({
            error: ''
        })
    }
    displayErrors(){
        var error = this.state.error
        if(!(error === "")){
            return (
                <div className = 'errorDisplay' style= {{textAlign: 'left', flexFlow: 'row wrap'}}>
                    {/*<img height = '40' width = '40' src = 'https://ih1.redbubble.net/image.36253000.9309/aps,650x642,small,transparent-pad,750x1000,f8f8f8.u2.jpg'></img>*/}
                    <div className = 'errorText'> 
                        {error}
                        <div className = 'closing'>
                            <a onClick = {this.resetError}>x</a>
                        </div>
                    </div>
                </div>
                
            )
        }
    }
    render(){
        return(
            <div class = "App">
                {this.state.isSignedIn 
                ? (
                  <div>
                      {this.displayNotification()}
                    {/*<div class="message message--success" data-message>
                        <p class="message__text">Hello {app.auth().currentUser.displayName}, You have successfully logged in. Welcome back!</p>
                        <button class="message__close" hidden data-closenotification>
                        <span class="message__closetext">Close message</span>
                        </button>
                </div>*/}
                  {/*<h1>Welcome {firebase.auth().currentUser.displayName}</h1>*/} 
                                    
                  <div>
                  </div>
                  {/*<button class = "signOut" onClick = {() => firebase.auth().signOut()}>SIGN OUT!</button>*/}
                  {this.state.username === "" ? (
                      this.writeUserData(app.auth().currentUser.uid,firebase.auth().currentUser.displayName)
                  ): (
                    this.writeUserData(app.auth().currentUser.uid,this.state.username)
                  )} 
                  <div class = "navbar">
                    <a onClick = {this.changeOption.bind(this, "Home")} class = {this.isActive("Home")}>Home</a>
                    <a  onClick = {this.changeOption.bind(this, "Search")}class = {this.isActive("Search")}>Search</a>
                    <a  onClick = {this.changeOption.bind(this, "Donate")}class = {this.isActive("Donate")}>Donate</a>
                     <a onClick = {this.changeOption.bind(this, "Restaurant")} class = {this.isActive("Restaurant")}>Restaurant</a>
                    {/*<a onClick = {this.changeOption.bind(this, "Profile")} class = {this.isActive("Profile")}>
                                                                                                            Profile
                </a>*/}
                    <a class = "signOut" onClick = {this.combinedTask}  >Sign Out</a>
                </div> 
                {this.renderComponent()}

                 
                </div>
                  
                ): (
                    this.state.isRegistering 
                    ?
                    (
                    <div>
                        <div marginTop = '10px'class = "navbar" style = {{height: '65px', textAlign: 'center', fontSize: '25px'}}>
                                    <img height = '65px' src = 'https://cdn.dribbble.com/users/2694750/screenshots/5881349/sok-logo-dribble.png'></img>
                        </div> 
                        {this.displayErrors()}
                        <form className = "loginForm" style = {{width: '450px', marginTop: '200px', textAlign: 'center'}}>
                                {/*{this.displayErrors()}*/}
                                <div className="form__element has-error" style = {{marginLeft: '30px'}}>
                                    <label className="form__label" for="email">
                                            Email
                                            <span className="form__required">required</span>
                                    </label>
                                    <input onChange = {this.emailChange}required className="form__input" id="email" type="text" name="email" aria-describedby="errorEmail"  pattern="[^]+@[^]+[.][a-z]{2,63}$" autocomplete="email"/>
                                    {/*<p role="alert" className="form__error" id="errorEmail">Please use a valid email address.</p>*/}
                                    {this.displayEmailValidation()}
                                    </div>

                                <div className="form__element" style = {{marginLeft: '30px'}}>
                                <label className="form__label" for="password">
                                        Password
                                        <span className="form__required">required</span>
                                </label>
                                <input data-error="Please use a password with at least 8 characters." data-empty="Please fill out this field"onChange = {this.passChange} className="form__input" id="password" type="password" name="password" minLength="8" aria-describedby="passwordHint" autocomplete="current-password"/>
                                <div  className = 'display'>
                                <a onClick = {this.viewPassword}style = {{fontWeight: 'bold',backgroundColor: '#be2826', padding: '12px 15px', borderRadius: '2px', fontSize: '8.5px',color: 'white', border: '0px'}}class="unmask" type="button" id = 'masking' title="Mask/Unmask password to check content">Show Password</a>
                                </div>
                                {/*<p className="form__hint" id="passwordHint">The password must be at least 8 characters long.</p>*/}
                                {this.displayPasswordValidation()}
                            </div>
                            <div className="form__element" style = {{marginLeft: '30px'}}>
                                <label className="form__label" for="password">
                                        UserName
                                        <span className="form__required">required</span>
                                </label>
                                <input data-error="Please use a UserName." data-empty="Please fill out this field"onChange = {this.usernameChange} className="form__input" id="name" type="text" name="username"  aria-describedby="passwordHint" autocomplete="current-password"/>
                                {/*<p className="form__hint" id="passwordHint">The password must be at least 8 characters long.</p>*/}
                                
                            </div>

                            <a href="/forgotPassword">Forgot password?</a>
                            <div style = {{marginTop: '30px'}}className = "Sign" >
                                        <a style = {{fontWeight: 'bold',backgroundColor: '#be2826', padding: '12px 95px', borderRadius: '0px', fontSize: '12px',color: 'white', border: '0px'}} onClick = {this.onceCredentials}>Sign Up</a>
                            </div>
                                </form>
                        <div style = {{marginLeft: '775px', marginTop: '-150px'}}>
                                    <img class = 'register' src = 'https://cdni.iconscout.com/illustration/premium/thumb/sign-up-page-1886582-1598253.png'></img>
                                </div>
                    </div>
                    ):(
                        this.state.isLoggingIn 
                        ?
                        (
                            <div>
                                <div marginTop = '10px'class = "navbar" style = {{height: '65px', textAlign: 'center', fontSize: '25px'}}>
                                    <img height = '65px' src = 'https://cdn.dribbble.com/users/2694750/screenshots/5881349/sok-logo-dribble.png'></img>
                                </div> 
                                {this.displayErrors()}
                                <form className = "loginForm" style = {{width: '450px', marginTop: '200px', textAlign: 'center'}}>
                                {/*{this.displayErrors()}*/}
                                <div className="form__element has-error" style = {{marginLeft: '30px'}}>
                                    <label className="form__label" for="email">
                                            Email
                                            <span className="form__required">required</span>
                                    </label>
                                    <input onChange = {this.emailChange}required className="form__input" id="email" type="text" name="email" aria-describedby="errorEmail"  pattern="[^]+@[^]+[.][a-z]{2,63}$" autocomplete="email"/>
                                    {/*<p role="alert" className="form__error" id="errorEmail">Please use a valid email address.</p>*/}
                                    {this.displayEmailValidation()}
                                    </div>

                                <div className="form__element" style = {{marginLeft: '30px'}}>
                                <label className="form__label" for="password">
                                        Password
                                        <span className="form__required">required</span>
                                </label>
                                <input data-error="Please use a password with at least 8 characters." data-empty="Please fill out this field"onChange = {this.passChange} className="form__input" id="password" type="password" name="password" minLength="8" aria-describedby="passwordHint" autocomplete="current-password"/>
                                <div  className = 'display'>
                                <a onClick = {this.viewPassword}style = {{fontWeight: 'bold',backgroundColor: '#be2826', padding: '12px 15px', borderRadius: '2px', fontSize: '8.5px',color: 'white', border: '0px'}}class="unmask" type="button" id = 'masking' title="Mask/Unmask password to check content">Show Password</a>
                                </div>
                                {/*<p className="form__hint" id="passwordHint">The password must be at least 8 characters long.</p>*/}
                                {this.displayPasswordValidation()}
                            </div>
                            <div className="form__element" style = {{marginLeft: '30px'}}>
                                <label className="form__label" for="password">
                                        UserName
                                        <span className="form__required">required</span>
                                </label>
                                <input data-error="Please use a UserName." data-empty="Please fill out this field"onChange = {this.usernameChange} className="form__input" id="name" type="text" name="username"  aria-describedby="passwordHint" autocomplete="current-password"/>
                                {/*<p className="form__hint" id="passwordHint">The password must be at least 8 characters long.</p>*/}
                                
                            </div>

                            <a href="/forgotPassword">Forgot password?</a>
                            <div style = {{marginTop: '30px'}}className = "Sign" >
                                        <a style = {{fontWeight: 'bold',backgroundColor: '#be2826', padding: '12px 95px', borderRadius: '0px', fontSize: '12px',color: 'white', border: '0px'}} onClick = {this.onceUser}>Log In</a>
                            </div>
                                </form>
                                <div style = {{marginLeft: '775px', marginTop: '0px'}}>
                                    <img className = 'yelp' src = 'https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'></img>
                                </div>
                            </div>
                        ):(
                            <div>
                            <div class = "Media">
                                <img class = "PayPalIMG" src = 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg'></img>
                                {/*<text class = "Welcome-Text">Sign In to Get Started!</text>*/}
                            </div>
                            <div class = "UserInformation" style = {{textAlign: 'center'}}>
                                <text style = {{textAlign: 'center'}}>Send, Donate,and Receive Money With Your Account</text>
                            </div>
                            <div class = "AppDescription">
                                <img src = "https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/c3/26/be/c326be44-276e-855c-6b67-5b8853640374/pr_source.png/300x0w.jpg"></img>
                                <img src = "https://cdn.macrumors.com/article-new/2014/09/applepaypassbook.jpg"></img>
                                <img></img>
                            </div>
                            <div class = "Subtext" style = {{marginTop: '669px', height: '260px'}}>
                            <div class = "MoreInfo">
                            <div class = "icon">
                                <img src = "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/home/module3-icon-1.png"></img>
                                <img src = "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/home/module3-icon3.png"></img>
                                <img src = "https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/home/module3-icon-2.png"></img>
                            </div>
                            </div>
                                <text>Secure Payments</text>
                                <text>Simple and Convenient</text>
                                <text >Acquire Many Rewards</text>
                            </div>
                            <div class = "Login" style = {{marginRight: '0px',marginLeft: '0px',marginBottom: '0px', marginTop: '-16px', height: '390px', background: 'linear-gradient(to right, blue,#6495ED, blue)'}}>
                            <div style = {{marginTop: '0px'}}>
                            <div>
                            <div style = {{textAlign: 'center'}}>
                                <text style = {{fontFamily: 'Patrick Hand', fontSize: '20px'}}><br/>Make the Most Of Your Money.</text>
                            </div>
                            <div style = {{marginTop: '25px',textAlign: 'center'}}>
                                <a style = {{fontWeight: 'bold',backgroundColor: '#3b5998', padding: '12px 86px', borderRadius: '2px', fontSize: '12px',color: 'white', border: '0px'}} onClick = {this.onButtonPress}>Register</a>
                            </div>
                            <div style = {{marginTop: '35px',textAlign: 'center'}}>
                                <a style = {{fontWeight: 'bold',backgroundColor: '#be2826', padding: '12px 95px', borderRadius: '2px', fontSize: '12px',color: 'white', border: '0px'}} onClick = {this.loginPress}>Login</a>
                            </div>
                            <div style = {{marginTop: '25px'}}>
                                <StyledFirebaseAuth class = "Special_Login" 
                                    uiConfig = {uiConfig}
                                    firebaseAuth ={app.auth()}
                                />
                            </div>
                            <div style = {{marginLeft: '150px', marginTop: '0px',fontSize: '20px', fontFamily : 'Patrick Hand'}} >
                                <text fontFamily = 'Patrick Hand' >New to Our App?<br/>Register Using an Email Account</text>
                           </div>
                            <div style = {{marginTop: '-260px', marginRight: '900px'}}class="arrow">
                               <div class="curve"></div>
                               <div class="point"></div>
                           </div>
                           
                           

                            </div>
                            {/*<div  style = {{textAlign: 'right'}}>
                                <big><big style = {{fontSize:'20px', transform: 'scale(5,5)', borderWidth: '0 3px 3px 0'}} >&#10550;</big></big>
                        </div>*/}
                            
                                   

                            </div>
                            </div>
                        </div>
                        )
                    )
                
                )
                } 
                
            </div>
            
        )
        
    }
}
export default App;