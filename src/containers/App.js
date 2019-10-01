import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}
	componentDidMount () {
		fetch('https://jsonplaceholder.typicode.com/users') 
			.then(response => { 
				return response.json(); 
			})
			.then(users => { 
				this.setState({robots: users}) 
			})
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value}) 
	}

	render () {
		const { robots, searchfield} = this.state; 
		const filteredRobots = robots.filter(robot => { 
			return robot.name.toLowerCase().includes(searchfield.toLowerCase()); 
			/*using the filter method, we return only those elements from the robots array whose name property,
			 converted to lowercase letters (using the toLowerCase method), includes the text we typed (also in small letters),
			  which is read from this.state.robots */
		})
		return (
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/> 
				<Scroll>
					<CardList robots={filteredRobots}/> {/*children component*/}
				</Scroll>
			</div>
		);
	}
}

export default App;