import React from 'react';
import ReactDOM from 'react-dom';
import App2 from '../Shelter/Shelter';
import * as serviceWorker from '../serviceWorker';
import '/Users/raviraghavan/phs-project/src/Donate/Donate.css'
class Donations extends React.Component {

  render() {
    return(
      <div > 
        <div class = "Membership" >
        </div>
        <div class = "donate-text">Use the Following Link to Send a Donation!
        <form   action = "/action_page.php">
        <div class = "submit">
        <a  href = "https://www.paypal.com/us/home"> DONATE</a>
        </div>
      </form>
        </div>
      
      </div>
      
    )
  }
}

export default Donations;

