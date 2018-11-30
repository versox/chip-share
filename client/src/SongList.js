import React, { Component } from 'react';
import APIHelper from './apiHelper.js';
import SongPlayer from './SongPlayer.js';
import Song from './editor/song/Song.js';

class SongList extends Component {
	constructor(props) {
		super(props);
		this.songs = [];
		this.state = {
			loading: false
		};
		this.loadMore();
	}
	loadMore() {
		if (this.state.loading)
			return;
		this.setState({loading: true});
		APIHelper.getSongs(this.props.userId, this.props.popular, this.delimiterId || null)
			.then(songs => {
				this.delimiterId = null;
				for (const i in songs) {
					const songData = songs[i];
					if (songData.hasOwnProperty('delimiterId')) {
						this.delimiterId = songData.delimiterId;
					} else {
						this.songs.push(<SongPlayer song={new Song(songData)} />);
					}
				}
				this.setState({loading: false, loaded: true});
			})
			.catch(err => {
				// TODO
			});
	}
	render() {
		return (
			<div>
				{this.songs.length === 0 && this.state.loaded ?
					<p className="text-center">Looks like there are no songs to display :(</p>
					:
					<ul className='song-list'>
						{this.songs}
					</ul>
				}
				{(this.state.loading || this.delimiterId) &&
				<div className="song-list-footer">
					{!this.delimiterId ?
						<div className="loading">Loading...</div>
						:
						<button className="btn btn-light load-more-btn" disabled={this.state.loading} onClick={this.loadMore.bind(this)}>{this.state.loading ? 'Loading...' : 'Load More'}</button>
					}
				</div>
				}
			</div>
		);
	}
}

export default SongList;
