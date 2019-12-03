import React from 'react';
import '/Users/raviraghavan/phs-project/src/Main/Main.css';
import SearchBar from '../Search/SearchBar'
import Yelp from '/Users/raviraghavan/phs-project/src/Yelp.js'
import RestaurantList from '../restaurant/RestaurantList'
//import oembedTweet from '/Users/raviraghavan/phs-project/src/Twitter.js'
//import {TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton }from 'react-twitter-embed';
import Robot from '../Robot'
import {TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton }from 'react-twitter-embed';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link, 
  Redirect
} from "react-router-dom";

class Main extends React.Component{
  render(){
    return(
    <div>
        
        <img src = "https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1" class = "house"></img>
        <div class = "twitt">
        <TwitterTweetEmbed tweetId = {'1190173219036286976'}>
        </TwitterTweetEmbed>
                
        {/*<Robot></Robot>*/}
      </div>
      </div>
       
   
    )
  }
}
export default Main;
