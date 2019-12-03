import React from 'react'
import '/Users/raviraghavan/phs-project/src/Search/SearchBar.css'
import * as firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Profile from '/Users/raviraghavan/phs-project/src/Profile/Profile.js'
import {db} from '/Users/raviraghavan/phs-project/src/Firebase/config.js'
class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categories: '',
            location: '',
            sortBy: 'best_match'
        }
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviews': 'review_count'
        }
        this.categoriesInputChange = this.categoriesInputChange.bind(this)
        this.locationInputChange = this.locationInputChange.bind(this)
        this.search = this.search.bind(this)
        this.displaySearchOptions = this.displaySearchOptions.bind(this)
        this.isActive = this.isActive.bind(this)
        this.combiFunc = this.combiFunc.bind(this)
        /*this.sortChange = this.sortChange.bind(this)*/

    }
    isActive(sortBy){
        if(this.state.sortBy === this.sortByOptions[sortBy]){
            return 'active'
        }
        else{
            return '';
        }
    }
    sortChange(sortByNew){
        this.setState({
            sortBy: sortByNew
        })
    }
    categoriesInputChange(event){
        this.setState({
            categories: event.target.value
        })
    }
    locationInputChange(event){
        this.setState({
            location: event.target.value
        })
    }
    search(event){
        this.props.onSearch(this.state.categories,this.state.location,this.state.sortBy)
        event.preventDefault();
    }
    displaySearchOptions(){
        return(Object.keys(this.sortByOptions).map(sortByOption => {
            return (<li className = {this.isActive(sortByOption)} key = {this.sortByOptions[sortByOption]} onClick = {this.sortChange.bind(this, this.sortByOptions[sortByOption])}>
                {sortByOption}
            </li>)
        }))
    }
    /*renderDatabase(event){
        //this.props.renderDatabase()
        //event.preventDefault();
    }*/
    combiFunc(event){
        this.search(event)
        //this.props.readInitialDB()
        event.preventDefault()
    }
    handleResponse(){
        var selectBox = document.getElementById('select')
        var selectedValue = selectBox.options[selectBox.selectedIndex].value
        this.isActive(selectedValue)
        this.sortChange.bind(this, selectedValue)
    }
    render(){
        return(
            
            <div className = "SearchBar">
                <text class = "text1">Find any Restaurant You want with Our Search Form!</text>
                {this.props.isActivated
                ?(
                    <div></div>
                ):(
                    <form className = "SearchForm" style = {{width: '450px'}}>
                    {/*<ul id = "horizontal-list">
                        <li className = {this.isActive("Best Match")} key = 'best_match' onClick = {this.sortChange.bind(this, 'best_match')}>
                            {"Best Match"}
                        </li>
                        <li className = {this.isActive("Highest Rated")} key = 'rating' onClick = {this.sortChange.bind(this, 'rating')}>
                            {"Highest Rated"}
                        </li>
                        <li className = {this.isActive("Most Reviews")} key = 'review_count' onClick = {this.sortChange.bind(this, 'review_count')}>
                            {"Most Reviews"}
                        </li>

                </ul>*/}
                    <div classname = "InputCategories" style = {{textAlign: 'center'}}>
                        <input id = "ICategory" type = "text"  placeholder = "Enter Category" onChange = {this.categoriesInputChange}/>
                    </div>
                    <div style = {{textAlign: 'center'}}>
                        <input id = "Input2" type = "text"  placeholder = "Enter Location" onChange = {this.locationInputChange} />
                    </div>
                    <div style = {{textAlign: 'center'}}>
                    <select id = 'select' onChange = {this.handleResponse.bind(this)} style = {{marginTop: '20px', textAlign: 'center'}}> 
                        <option value="Best Match">Best Match</option>
                        <option value="Highest Rated">Highest Rated</option>
                        <option value="Most Reviews">Most Reviews</option>
                    </select>
                    </div>
                    <div className = "RenderButton" >
                        <a  onClick = {this.combiFunc}>Search</a>
                    </div>
                </form>
                )
                }
                
            </div>
        )
    }


}
export default SearchBar;