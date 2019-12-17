import React from 'react'
import '/Users/raviraghavan/phs-project/src/restaurant/RestaurantList.css'
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';
import Restaurant from '../restaurant/Restaurant'
const APIKEY = 'AIzaSyDUbghpTXLDD9xTRDfSNs5p2JjLHTQ1R2Q';

class RestaurantList extends React.Component{
   
    render(){
        return(
            <div style = {{textAlign: 'center'}}className = "Restaurants">{
                this.props.listOfBusinesses.map(business => {
                    return <Restaurant onRemove = {this.props.onRemove} onAdd = {this.props.onAdd} user = {this.props.user} deleteFromFirebase = {this.props.deleteFromFirebase} style = {{display: 'inline-block'}} readFromFirebase = {this.props.readFromFirebase} addToPersonalDB = {this.props.addToPersonalDB} key = {business.id} business = {business} />;
                })
                
            }</div>
        )
            
    
    
}
}
export default RestaurantList;