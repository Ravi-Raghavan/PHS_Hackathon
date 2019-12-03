import React from 'react'
import {TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton }from 'react-twitter-embed';
import '/Users/raviraghavan/phs-project/src/Twitter/TwitterUpload.css'

class TwitterUpload extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            restaurant: "Wendys"
        }
        this.updateRestaurant = this.updateRestaurant.bind(this)
        this.displayTwitterTimeline = this.displayTwitterTimeline.bind(this)
        this.getUserInput = this.getUserInput.bind(this)
    }
    updateRestaurant(event){
        this.setState({
            restaurant: event.target.value
        })
    }
    displayTwitterTimeline(prompt){
        return(
            <div>
                <TwitterTimelineEmbed sourceType = "profile" screenName = {prompt} options= {{height:800}}>
            </TwitterTimelineEmbed> 
            </div>
            
        )
    }
    getUserInput(){
        var restaurant = window.prompt("Enter your restaurant: ")
        this.setState({
            restaurant: restaurant
        })
        return restaurant
    }
    render(){
        return(
            <div >
            <div class = "Hashtag">
            <TwitterHashtagButton
            tag={'leftoverfood'}
            />  
            </div>
            {this.displayTwitterTimeline(window.prompt("Enter restaurant: "))}
            </div>
            
        )
    }
}
export default TwitterUpload;