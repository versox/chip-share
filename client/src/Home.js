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
	    this.titles = [
	      "Title 1", "Title 2", "Title 3"
	    ];
	    this.artists = [
	      "Artist 1", "Artist 2", "Artist 3"
	    ];
    }

    render() {
	return (
	    <div>
		<header>
		      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
		        <ol className="carousel-indicators">
		          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
		          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
		          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
		        </ol>
		        <div className="carousel-inner" role="listbox">
		          <div className="carousel-item active" style={this.slide1}>
				<button type="button" className="btn btn-light carousel-button">View The Tutorial</button>
		          </div>
		          <div className="carousel-item" style={this.slide2}>
				<button type="button" className="btn btn-light carousel-button">Listen To Example Songs</button>
		          </div>
		          <div className="carousel-item" style={this.slide3}>
				<button type="button" className="btn btn-light carousel-button">Create a New Song</button>
		          </div>
		        </div>
		        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
		          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
		          <span className="sr-only">Previous</span>
		        </a>
		        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
		          <span className="carousel-control-next-icon" aria-hidden="true"></span>
		          <span className="sr-only">Next</span>
		        </a>
		      </div>
		    </header>
		  <div class="msec">
			<h3>Most Popular Songs</h3>
			<div className="song-list">
				<button type="button" className="btn btn-light">Play</button>
				<span className="song-title">{this.titles[0]}</span>
				<a href="#top" className="artist-name">{this.artists[0]}</a>
			</div>
			<div className="song-list">
		        	<button type="button" className="btn btn-light">Play</button>
		                <span className="song-title">{this.titles[1]}</span>
		                <a href="#top" className="artist-name">{this.artists[1]}</a>
		        </div>
			<div className="song-list">
		                <button type="button" className="btn btn-light">Play</button>
		                <span className="song-title">{this.titles[2]}</span>
		          	<a href="#top" className="artist-name">{this.artists[2]}</a>
		        </div>
		  </div>
		  <div className="msec">
		        <h3>About</h3>
			<p>    Chip Share is a chiptune song editor right on your browser! It is developed using <a href="https://reactjs.org/">ReactJS</a> as a front-end framework and <a href="https://expressjs.com/">Express-NodeJS</a> back-end framework.</p>
		        <p>    It is a school project developed by Jake, Carson, Mishel, and Alex at Ryerson University, Toronto, Canada.</p>
		  </div>
	    </div>
	);
    }
}

export default Home;
