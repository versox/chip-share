import React, { Component } from 'react';
import APIHelper from './apiHelper.js';
import SongPlayer from './SongPlayer.js';
import Song from './editor/song/Song.js';

class Profile extends Component {

    render() {
	var songs = [];
	var songMetas = APIHelper.getSongs();
	for (let i = 0; i< songMetas.length; i++) {
	    songs.push(<SongPlayer song={new Song(songMetas[i])} />);
	}

	return (
	    <div>
	      <h1 class="account-name">Account Name</h1>
	      <div class="container">
	          <h3>My Songs</h3>
		  <hr></hr>
	          <ul className='song-list'>
		      {songs}
	          </ul>
	      </div>
	    </div>
	);
    }
}

export default Profile;
