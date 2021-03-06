import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import APIHelper from './apiHelper.js';
import SongRating from './SongRating.js';
import constants from "./constants";

class SongPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			to: "",
			playBtn: "play-btn",
			playing: false
		};
		this.song = props.song;
		this.song.addProgressListener(this, (pct) => {
			this.setState({
				progress: Math.floor(pct*100)+'%'
			});
		});
	}

	onEdit() {
		let id = this.song.id || "";
		this.setState({
			redirect: true,
			to: "/editor/" + id
		});
	}

	onPlayPause() {
		if (this.loading)
			return;
		if (this.state.playing) {
			this.setState({ playBtn: "play-btn", playing: false });
			this.song.pause();
		} else {
			if (!this.song.loaded) {
				this.loading = true;
				APIHelper.getSong(this.song.id, 'composition')
					.then((data) => {
						return JSON.parse(data);
					})
					.then((parsed) => {
						this.song.load(parsed);
						this.loading = false;
						this.onPlayPause();
					})
					.catch(() => {
						// Could not play error
					});
			} else {
				this.setState({ playBtn: "pause-btn", playing: true });
				this.song.play();
			}
		}
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.to} />;
		}
		return (
			<li>
				<div className="song-header" style={{background: '#007eff45'}}>
					<div>
						<button onClick={() => this.onPlayPause()} className={"btn btn-light playback-btn " + this.state.playBtn}></button>
						<div className="song-title">{this.song.name}</div>
					</div>
					<div>
						{APIHelper.getCurrentUser() && APIHelper.getCurrentUser().username === this.song.username &&
						<div className="buttons-container">
							<button onClick={()=> this.onEdit()} className="btn btn-light"><i className="fa fa-pencil"></i></button>
							<button className="btn btn-light"><i className="fa fa-trash"></i></button>
						</div>
						}
						<a href={constants.ROOT_PATH+'profile/'+this.song.username} className="song-artist">
							<div className="name">{this.song.author}</div>
							<div className="username">@{this.song.username}</div>
						</a>
					</div>
					<div className="play-progress" style={{width: this.state.progress}}></div>
				</div>
				<div className="song-body">
					<SongRating song={this.song} changeable={APIHelper.isLoggedIn()} value={this.song.ratings ? this.song.ratings.average : 0} />
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
