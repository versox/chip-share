import React, { Component } from 'react';
import './assignment.css'; 
import SongPlayer from './SongPlayer.js';
import ThemedGist from 'react-themed-gist';

class TutorialPage extends Component {
	constructor(props) {
	    super(props);
	    this.exampleSong = {
		name: "Example Song",
		author: "Carson",
		username: "500821516",
		getFormattedCreate: function() {
		    return "today";
		},
		hasBeenUpdated: function() {
		    return false;
		}
	    };
	}

	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Creating a page using React and Express:</h1>

						<p>For our demo website, we have created an online chiptune sharing application. You can create new songs, adapt from the songs of other users, or simply browse the site and rate the previously submitted songs. </p>
						<p>To keep this tutorial simple we will only explore the creation of the "top songs" page.</p>
						<h3>React: The Page Component</h3>
						<p>React allows you to split your code into reusable pieces called components.</p>
						<p>Start by creating a file, <span class='file'>TopSongs.js</span>. This file will contain a javascript class representing the "top songs" component for the website.</p>
						<ThemedGist id='fdfb1e28d651739e1bee56a2e8f16f3f' theme='one-dark'/>
						<p>Put some HTML in for the basic layout of the page.</p>
						<ThemedGist id='7afcaaf1eaec2d2a5a8ec4865121589a' theme='one-dark'/>
						<p>Cool! But we could have made that site without react. What we really want is something dynamic. A list of interactable songs made by people on chip-share.</p>
						<p>This can be accomplished by making a component for a single song and repeatedly displaying it for all of the top songs.</p>
						<h3>React: The SongPlayer Component</h3>
						<p>Create another file, <span class='file'>SongPlayer.js</span> that will represent a single song in the list.</p>
						<p>This component will receive an object representing the data of the song through a react property. We will call the property "song".</p>
						<p><span style={{ color: 'blue' }}>{"{ }"}</span> Curly brackets inside JSX let you evaluate javascript and have it display inside your HTML. We will use them to render information from our song.</p>
						<ThemedGist id="993cdfd3edee2174a4fb7f74bc97a29a" theme="one-dark"/>
						<p>Here is the SongPlayer we just made:</p>
						<ul className="song-list">
						    <SongPlayer song={this.exampleSong}/>				
						</ul>
						<p>Now it's time to use it.</p>
						<h3>Making The TopSongs Page Dynamic</h3>




						<img src="file:///home/carson/Pictures/chipshare%20page%20tutorial/one.png"></img>
						<a href="/" className="btn btn-lg btn-success">ChipShare Homepage</a>
					</div>
				</div>
			</div>
		);
	}
}

export default TutorialPage;
