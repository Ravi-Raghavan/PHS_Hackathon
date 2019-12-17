var apiKEY = 'stLKpaCsKjy37WhBJhdXuU0rM9XU5iV3RP0mqx1TO1gwvAUx3LDnw9OLD_l-PlDXE_sw5XkYRgY_e-c4NKd1KcX_CohLyWLbSmzA2S3dB2ozFlo_ePGBwzlLIcajXXYx'
const http = require('http')
const request = require('request')
const fetch = require('node-fetch')
var errorValue = ""
var options  = {
    url: 'http://127.0.0.1:5000/api/v1/resources/user/add',
    method: "POST"
}

var req = http.request(options, function(res){
    errorValue = res.statusCode
    window.prompt(res.statusCode)
})
const Flask = {
    //Python Code Equivalent: Get User Data
    retrieve_user(name){
        var finalValue = NaN
        var options2 = {
            method: "GET",
            uri: `http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=${name}`
        }
        var options3 = {
            host: 'http://127.0.0.1:5000',
            path: `/api/v1/resources/restaurants/user?name=${name}`
        }
        var categories = "food"
        var location = "New York"
        var sortBy = "Best Match"
        let url = `http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=${name}`;
        var base_url = `https://firestore.googleapis.com/v1/projects/phsproject-40dfd/databases/(default)/documents/users/${name}`
        var categories = "food"
        var location = "New York"
        var sortBy = "best_match"
        async function stuff(){
            /*try{
                const response =  await fetch(url)
                if(!response.ok){
                    throw new Error("we fucked up boiz")
                }
                window.prompt("Success!")
            }
            catch(error){
                window.prompt("There has been an Error with your fetch attempt")
            }*/
            
            let response = await fetch('http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=person13', {mode: 'cors', headers: {'Access-Control-Allow-Origin': '*'}})
            
            if(response.ok){
                let commits = await response.json()
                window.prompt("Data has been gathered")
                window.prompt("Data: ", commits)
            }
            else{
                window.prompt("Response Status: ", response.status)
            }
        }
        
        //stuff()
        
        var proxy = 'https://cors-anywhere.herokuapp.com/'
        var final_url = proxy + url
        return fetch(url).then(response => {return response.json()}).then(data => { return(data['restaurants'])}).catch(function(error){
            console.log(error)
        })
        
    },
    //Python Code Equivalence: Create a New User
    add_user(userName){
        var data = {
            name: userName
        }
        request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://127.0.0.1:5000/api/v1/resources/user/add',
            body: `name=${userName}`
        }, function(error, response,body){
            //window.prompt(body)
        })
    },
    //Python Code Equivalence: Add a new Restaurant to the User's Portfolio
    add_restaurant(userName, id, restaurantName2){
        var data = {
            name: userName,
            restaurantID: id,
            restaurantName: restaurantName2
        }
        request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://127.0.0.1:5000/api/v1/resources/restaurants/user',
            body: `name=${userName}&restaurantID=${id}&restaurantName=${restaurantName2}`
        }, function(error, response,body){
            //window.prompt(response)
            //window.prompt(body)
        })
        return "Yes"
    },
    //Python Code Equivalent: Add List
    add_list_of_restaurants(userName, restaurantListwithIDs){
        var id = []
        var name = []
        var i;
        for(i = 0; i< restaurantListwithIDs.length; i++){
            id.push(restaurantListwithIDs[i]['id'])
            name.push(restaurantListwithIDs[i]['name'])
            
            //console.log(restaurantListwithIDs[i]['name'])
        }
        console.log(Array.from(name))
        console.log(name[0])
        console.log(typeof ["Ravi", "Ravi"])
        //name = ["Ravi is awesome", "Ravi is awesome", "Ravi is awesome", "Ravi is awesome", "Ravi is awesome", "Ravi is awesome", "Ravi is awesome"]
        request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://127.0.0.1:5000/api/v1/resources/restaurantList/user',
            body: `userName=${userName}&id=${id}&names=${name}`
        }, function(error, response,body){
            //window.prompt(response)
            //window.prompt(body)
        })
        return "Yes"
    }
}

export default Flask;