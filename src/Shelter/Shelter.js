import React from 'react';
import SearchBar from '../Search/SearchBar'
import Yelp from '/Users/raviraghavan/phs-project/src/Yelp.js'
import RestaurantList from '../restaurant/RestaurantList'
//import oembedTweet from '/Users/raviraghavan/phs-project/src/Twitter.js'
import {TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton }from 'react-twitter-embed';
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Profile from '/Users/raviraghavan/phs-project/src/Profile/Profile.js'
import {db} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'


class Shelter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      businesses: [],
      personal_database: [],
      activated: false
    }
    this.search = this.search.bind(this)
    this.displayDB = this.displayDB.bind(this)
    this.addToPersonalDB = this.addToPersonalDB.bind(this)
    this.readFromFirebase = this.readFromFirebase.bind(this)
    this.readInitialDB = this.readInitialDB.bind(this)
    this.testFunction = this.testFunction.bind(this)
    this.delfromFireBase = this.delfromFireBase.bind(this)
  }
  search(categories, location, sortBy){
    Yelp.search(categories,location,sortBy).then(response => {
      this.setState({
        businesses:response,
        activated: true
      })
    })
  }
 //Map over businesses array and check if each business is a child node in the Firebase Database under the parent node of restaurants
 //If true, we add this to personal_database's initial value
 testFunction(){
   var b = [];
   var myObj;
   var self = this;
   var currentUser = firebase.auth().onAuthStateChanged(user => {
     if(user){
      currentUser = user
     }
   })
   var name = this.props.user
   var restaurantRef = db.ref('users' + name + '/restaurants')
   restaurantRef.once('value', function(snapshot){
     b.push(snapshot.key)
     snapshot.forEach(function(child){
       b.push("HELLO")
       var item = child.val()
       item.key = child.key
      b.push(child.key)
      })
      
   })
   return b;
 }
  readInitialDB(){
    var b = [];
    var self = this;
    var userID = firebase.auth().onAuthStateChanged(user =>{
      if(user){
        userID = user
      }
    })
    var restaurantRef = db.ref('users/' + userID.displayName + '/restaurants')
    restaurantRef.once('value').then(function(snapshot){
      self.state.businesses.map(business => {
        if(snapshot.hasChild(business.name)){
          b.push(business.name)
        }
      })
      
    })
    return b;
  }
  displayDB(){
    var self  = this
    return(
    self.state.personal_database.map(element => {
    return(<tr style = {{display: 'inline-flex', border: '1px solid black', textAlign: 'center'}}>{element}</tr>)
  })
  )
  }
  addToPersonalDB(name){
    
    this.setState({
        personal_database: this.state.personal_database.concat(name)
    })
  }
  readFromFirebase(name){
    var rlength = name.length
        if(name.charAt(rlength-1) == "."){
            name = name.slice(0, (rlength-1))
        }
    var self = this;
    var userID = firebase.auth().onAuthStateChanged(user =>{
      if(user){
        userID = user.uid
      }
    })
    var restaurantRef = db.ref('users/' + firebase.auth().currentUser.displayName + '/restaurants' + "/" + name)
    restaurantRef.on('value', function(snapshot){
      self.setState({
        personal_database: self.state.personal_database.concat(snapshot.key)
      })
    })
  }
  delfromFireBase(name){
    var rlength = name.length
        if(name.charAt(rlength-1) == "."){
            name = name.slice(0, (rlength-1))
        }
    var self = this;
    var newArr = []
    var index = -1
    var originalArr = self.state.personal_database
    var userID = firebase.auth().onAuthStateChanged(user =>{
      if(user){
        userID = user.uid
      }
    })
    var restaurantRef = db.ref('users/' + firebase.auth().currentUser.displayName + '/restaurants' + "/" + name)
    restaurantRef.on('value', function(snapshot){
      index = originalArr.indexOf(snapshot.key)
      newArr = originalArr.slice(0, index).concat(originalArr.slice(index+1, originalArr.length))
      self.setState({
        personal_database: newArr
      })
    })
  }
  extraCode(){
    /**{/*<table style = {{flexDirection: "column", display: 'inline-flex', border: '1px solid black', borderCollapse: 'collapse'}}>
            <th style = {{flexDirection: "column", display: 'inline-flex', border: '1px solid black'}}>Company Name</th>
            {this.displayDB()}
        </table>*/
  }
  render(){
    return(
      <div className = "Shelter"> 
      
      <p class = "Kindness">
      <SearchBar isActivated = {this.state.activated} user = {this.props.user} readInitialDB = {this.readInitialDB} onSearch = {this.search}/>
      </p>
      <div class = "RestaurantList"> 
      <RestaurantList onRemove = {this.props.onRemove} onAdd = {this.props.onAdd} user = {this.props.user} deleteFromFirebase = {this.delfromFireBase} readFromFirebase = {this.readFromFirebase} addToPersonalDB = {this.addToPersonalDB} listOfBusinesses = {this.state.businesses}/> 
      </div>
      <div style = {{textAlign: 'center', flexDirection: "column"}}class = "renderDatabase">
        {this.state.activated 
        ?(
          <div></div>
        ):(
          <text style = {{textAlign: 'center', fontFamily: 'Patrick Hand', fontSize: '50px'}}>Search Form</text>
        )
        }
      </div>
      </div>
      
    );
  }
}
export default Shelter;
