import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './assignment.css';
import SongPlayer from './SongPlayer.js';
import TopSongs from './TopSongs.js';
import ThemedGist from 'react-themed-gist';

class TutorialPage extends Component {
	constructor(props) {
	    super(props);
	    this.exampleSong = {
		name: "Example Song",
		author: "Carson",
		username: "500821516",
		createDate: "today"
	    };
	}

	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12 tutorialHolder">
						<h1>Creating a page using React and Express:</h1>

						<p>For our demo website, we have created an online chiptune sharing application. You can create new songs, adapt from the songs of other users, or simply browse the site and rate the previously submitted songs. </p>
						<p>To keep this tutorial simple we will only explore the creation of a "top songs" page.</p>
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
						<p>We will use it shortly.   :)</p>
						<h3>Express: Providing Songs From A Backend</h3>
						<p>We need to get the top songs from somewhere. Express is a server side framework that allows us to handle requests.</p>
						<p>We will use express to return a list of songs in JSON when the server receives a GET request to /api/songs</p>
						<p>Here is the boilerplate code for <span className="file">Server.js</span></p>
						<ThemedGist id="4b9b3c79b4aa61dd2732775137afa37c" theme="one-dark"/>	
						<p>Now lets make it return a list of songs.</p>
						<ThemedGist id="58726ed7a908c3882accfd3322554be6" theme="one-dark"/> 
						<h3>Making The TopSongs Page Dynamic</h3>
						<p>Lets go back to our <span className="file">TopSongs.js</span> file and import the SongPlayer component at the top.</p>
						<ThemedGist id="713b52c116d5e588bdfb129ed2a6e80d" theme="one-dark"/>
						<p>Change the constructor to get songs from our Express server.</p>
						<ThemedGist id="9c3f430c7254859b8d82e453c828e5ad" theme="one-dark"/>
						<p>Make it render a SongPlayer for each of our songs.</p>
						<ThemedGist id="f0f8c4a46af832c6d81af5ed0f09da3d" theme="one-dark"/>
						<p>We're pretty much done. Just need to do the styles.</p>
						<h3>Styling The Songs List</h3>
						<p>To use stylesheets in react, we import them.</p>
						<ThemedGist id="a1c4efdbc5cca0041bc4540a42612c30" theme="one-dark"/>
						<p>Here is <span className='file'>topsongs.css</span>.</p>
						<ThemedGist id="10fb179e4635750a1fe10443f5ed6e6a" theme="one-dark"/>
						<h3>Tutorial Conclusion</h3>
						<p>We have now created a great looking page using React and Express.</p>
						<p>We encourage you to checkout both the page made with this tutorial and our actual site <a href="http://chipshare.me">chipshare.me</a></p>
						<Link className="btn btn-lg btn-light" style={{marginRight: '25px'}} to="/assignment/topsongs">Tutorial Page (TopSongs)</Link>
						<a href="http://chipshare.me" className="btn btn-lg btn-success" style={{marginRight: '25px'}}>Chip Share Homepage</a>
						<a href="/assignment/conclusion" className="btn btn-lg btn-primary">Continue to Conclusion</a>
					</div>
				</div>
			</div>
		);
	}
}

export default TutorialPage;
