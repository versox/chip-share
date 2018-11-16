import React, { Component } from 'react';

class Home extends Component {

    constructor(props) {
	    super(props)
	    this.slide1 = {
	      backgroundImage: 'url(/assets/Slide1.png)'
	    }
	    this.slide2 = {
              backgroundImage: 'url(/assets/Slide2.png)'
	    }
	    this.slide3 = {
              backgroundImage: 'url(/assets/Slide3.png)'
	    }
    }

    render() {
	return (
	    <div>
		<header>
		      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
		        <ol class="carousel-indicators">
		          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
		          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
		          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
		        </ol>
		        <div class="carousel-inner" role="listbox">
		          <div class="carousel-item active" style={this.slide1}>
				<button type="button" class="btn btn-light carousel-button">View The Tutorial</button>
		          </div>
		          <div class="carousel-item" style={this.slide2}>
				<button type="button" class="btn btn-light carousel-button">Listen To Example Songs</button>
		          </div>
		          <div class="carousel-item" style={this.slide3}>
				<button type="button" class="btn btn-light carousel-button">Create a New Song</button>
		          </div>
		        </div>
		        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
		          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		          <span class="sr-only">Previous</span>
		        </a>
		        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
		          <span class="carousel-control-next-icon" aria-hidden="true"></span>
		          <span class="sr-only">Next</span>
		        </a>
		      </div>
		    </header>
		  <div class="msec">
			<h3>Most Popular Songs</h3>
			<div class="song-list">
				<button type="button" class="btn btn-light">Play</button>
				<span class="song-title">Song Title</span>
				<a href="#" class="artist-name">Artist Name</a>
			</div>
			<div class="song-list">
		        	<button type="button" class="btn btn-light">Play</button>
		                <span class="song-title">Song Title</span>
		                <a href="#" class="artist-name">Artist Name</a>
		        </div>
			<div class="song-list">
		                <button type="button" class="btn btn-light">Play</button>
		                <span class="song-title">Song Title</span>
		          	<a href="#" class="artist-name">Artist Name</a>
		        </div>
		  </div>
		  <div class="msec">
		        <h3>About</h3>
			<p>    Chip Share is a chiptune song editor right on your browser! It is developed using <a href="https://reactjs.org/">ReactJS</a> as a front-end framework and <a href="https://expressjs.com/">Express-NodeJS</a> back-end framework.</p>
		        <p>    It is a school project developed by Jake, Carson, Mishel, and Alex at Ryerson University, Toronto, Canada.</p>
		  </div>
	    </div>
	);
    }
}

export default Home;
