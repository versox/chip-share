import React, { Component } from 'react';

class SongPlayer extends Component {
    constructor(props) {
	super(props);
	this.song = props.song;
    }

    render() {
	return (
	    <li>
		<div className="song-header" style={{background: '#007eff45'}}>
		    <div>
			<button className="btn btn-light playback-btn play-btn"></button>
			<div className="song-title">{this.song.name}</div>
		    </div>
		    <div>
			<div className="buttons-container">
			    <button className="btn btn-light"><i className="fa fa-pencil"></i></button>
			    <button className="btn btn-light"><i className="fa fa-trash"></i></button>
			</div>
		   	<a className="song-artist">
			    <div className="name">{this.song.author}</div>
			    <div className="username">@{this.song.username}</div>
		   	</a>
		    </div>
		    <div className="play-progress"></div>
	 	</div>
		<div className="song-body">
		    <div className="song-dates">
			<span className="song-creation-date">Created {this.song.getFormattedCreate()}</span>
			<span className="song-update-date">{
			    this.song.hasBeenUpdated() ? "Updated " + this.song.getFormattedUpdate() : ""
			}</span>
		    </div>
		</div>
	    </li>
	);
    }
}

export default SongPlayer;
