import React, { Component } from 'react';

class Profile extends Component {

    constructor(props) {
	    super(props)
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
	      <h1 class="account-name">Account Name</h1>
	      <div class="container">
		<div class="row">
	          <div class="col">
	            <div class="msec">
		      <h3>My Songs</h3>
		      <hr></hr>
		      <button class="btn btn-light" href="#">Create a New Song</button>
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
	          </div>
		  <div class="col">
		    <div class="msec">
		      <h3>Favourite Songs</h3>
		      <hr></hr>
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
		  </div>
		</div>
	      </div>
	    </div>
	);
    }
}

export default Profile;