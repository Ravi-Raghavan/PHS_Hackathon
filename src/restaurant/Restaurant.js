import React from 'react'
import Main from '/Users/raviraghavan/phs-project/src/Main/Main.js';
import Shelter from '/Users/raviraghavan/phs-project/src/Shelter/Shelter.js'
import Donate from '/Users/raviraghavan/phs-project/src/Donate/Donate.js'
import TwitterUpload from '/Users/raviraghavan/phs-project/src/Twitter/TwitterUpload.js'
import '/Users/raviraghavan/phs-project/src/Login/Login.css'
import App from '/Users/raviraghavan/phs-project/src/App.js'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Profile from '/Users/raviraghavan/phs-project/src/Profile/Profile.js'
import {db} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
//var database = firebase.database()

class Restaurant extends React.Component{
    constructor(props){
        super(props);
        this.splitRestaurantName = this.splitRestaurantName.bind(this)

        this.state = {
            restaurantData: [" "]
        }
        this.addToBase2 = this.addToBase2.bind(this)
        this.removeFromBase = this.removeFromBase.bind(this)
        this.combineFunc = this.combineFunc.bind(this)
        this.combineFunc2 = this.combineFunc2.bind(this)
        this.deleteFromFirebase = this.deleteFromFirebase.bind(this)
    }
    splitRestaurantName(){
        let res = JSON.stringify(this.props.business.name).split("")
        let final = ''
        var i;
        for(i = 0; i<res.length; i++){
            final = final + res[i] + '+'
        }
        
        final = final.substring(0, final.length)
        return final
    }
    splitAddress(){
        
        let res = JSON.stringify(this.props.business.address).split("")
        let final = ''
        var i;
        for(i = 1; i<res.length; i++){
            final = '+' + res[i]
        }
        return final.substring(1, final.length)
        
    }
    /*formatCity(){
        
        let final = "+" + JSON.stringify(this.props.restaurant.city)
        return final
    }
    formatState(){
        let final = "+" + JSON.stringify(this.props.restaurant.state)
        return final
    }*/
    addtoBase(restaurant){
        var myArr = this.state.restaurantData
        this.setState({
            restaurantData: myArr.push(restaurant)
        })
    }
    addToBase2(myRestaurant){
        var rlength = myRestaurant.length
        if(myRestaurant.charAt(rlength-1) == "."){
            myRestaurant = myRestaurant.slice(0, (rlength-1))
        }
        var self = this;
        this.setState({
            restaurantData: self.state.restaurantData.concat(myRestaurant)
        })
        var userID = firebase.auth().currentUser.uid
        var reference = db.ref('users/' + firebase.auth().currentUser.displayName + "/restaurants" ) 
        db.ref('users/' + firebase.auth().currentUser.displayName + "/restaurants" + "/" + myRestaurant).set({
            name: myRestaurant
        }
        )        
        /*var newChild = reference.push()
        newChild.set({
           key: myRestaurant
        })*/
    }
    addToPersonalDB(name){
        this.props.addToPersonalDB(name)
    }
    combineFunc(name){
        this.addToBase2(name)
        this.readFromFirebase(name)
    }
    readFromFirebase(name){
        this.props.readFromFirebase(name)
    }
    deleteFromFirebase(name){
        this.props.deleteFromFirebase(name)
    }
    combineFunc2(name){
        this.deleteFromFirebase(name)
        this.removeFromBase(name)

    }
    removeFromBase(myRestaurant){
        var rlength = myRestaurant.length
        if(myRestaurant.charAt(rlength-1) == "."){
            myRestaurant = myRestaurant.slice(0, (rlength-1))
        }
        var self = this;
        this.setState({
            restaurantData: self.state.restaurantData.concat(myRestaurant)
        })
        var userID = firebase.auth().currentUser.uid
        var reference = db.ref('users/' + firebase.auth().currentUser.displayName + "/restaurants" ) 
        db.ref('users/' + firebase.auth().currentUser.displayName + "/restaurants" + "/" + myRestaurant).remove()
    }
    render(){
        return(
            <div style = {{marginLeft: '45px'}}className = "Restaurant">
                <div className = "Main-Image">
                    <a href = {this.props.business.url}><img width = "300" height = "300" src = {this.props.business.imageSrc}></img></a>
                </div>
                <div style = {{textAlign: 'center'}}className = "Name">
                    <a >{this.props.business.name}</a>
                </div>
                <div className = "ColumnSet">
                    <div style = {{marginTop: '10px'}}className = "Column1">
                        <a>{this.props.business.address}</a>
                        <p>{this.props.business.city}</p>
                        <p>{this.props.business.state}</p>
                        <p>{this.props.business.zipCode}</p>
                        <div className = "DirectionsButton">               
                            <a href = {`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${this.props.business.name}+${this.props.business.city}+${this.props.business.state}&travelmode=driving`}>Get Directions</a>
                        </div>
                    </div>
                </div>
                <div style = {{marginBottom: '10px', marginTop: '10px'}}class = "AddButton">
                    <a style = {{cursor: 'pointer', width: '25%', padding: '4px', borderRadius: '4px', alignSelf: 'center', fontSize: '0.8rem', backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} onClick = {this.combineFunc.bind(this,this.props.business.name)} >ADD</a>
                </div>
                <div style = {{marginBottom: '10px', marginTop: '10px'}}>
                    <a style = {{cursor: 'pointer', width: '25%', padding: '4px', borderRadius: '4px', alignSelf: 'center', fontSize: '0.8rem', backgroundColor: 'green', color: 'white', fontWeight: 'bold'}} onClick = {this.combineFunc2.bind(this,this.props.business.name)} >REMOVE</a>                
                </div>
                
                
                
            </div>
        )
    }
}
export default Restaurant;