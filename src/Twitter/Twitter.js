import React from 'react'
import {TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton }from 'react-twitter-embed';

var Twitter = require('twitter')
var client = new Twitter({
    consumer_key: 'eZWnvvDpzraUaKeBp1UC35kBl',
    consumer_secret: 'Dc1JWJBR6aVL8BVzJVeF7encFTk9GZEfYyh7CpYCPbxTlGVe97',
    access_token_key:'1190096855776010240-KgU2Sn0URTU4YcADEOrKJmT4FsBBKx' , 
    access_token_secret :'kIIzZRwsQmFGretqdsolWyDNzPrBseN8R75GLoNKnnlgK'
})
client.get('search/tweets', {q: 'Donald Trump'}, function(error, tweets, response){
    console.log(tweets)
})



//    console.log(tweets["statuses"][0]["id"])
