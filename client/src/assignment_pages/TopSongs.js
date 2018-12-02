import React, { Component } from 'react';
import SongPlayer from './SongPlayer.js';
import './topsongs.css';

class TopSongs extends Component {
    
    constructor(props) {
	super(props);
	// React has a thing called state
	// When state changes the website will rerender
	this.state = {
	    songs: [
		{
		    name: "Paranoid Android",
		    author: "Thom Yorke",
		    username: "Radiohead",
		    createDate: "May 26 1997"
		},
		{
		    name: "Hey Jude",
		    author: "Paul McCartney",
		    username: "The Beatles",
		    createDate: "August 26 1968"
		},
		{
		    name: "Surfin USA",
		    author: "The Beach Boys",
		    username: "bboys",
		    createDate: "March 25 1963"
		},
		{
		    name: "The View From The Afternoon",
		    author: "Alex Turner",
		    username: "Arctic Monkeys",
		    createDate: "January 23 2006"
		},
		{
		    name: "Fur Elise",
		    author: "Ludwig van",
		    username: "Beethoven",
		    createDate: "April 27 1810"
		}
	    ]
	}
    }

    render() {
	// We make an array of SongPlayers using our songs array
	var songPlayers = this.state.songs.map(
	    /* The map function goes through each element
	       in the array and uses the function below to
	       transform it. The results are put into a new
	       array and returned. */
	    (song) => {
		// we make a SongPlayer component using each song
		return <SongPlayer song={song} />;
	    }
	);

	return (
	    <div className='container'>
		<h1>Top Songs:</h1>
		<ul className='song-list'>
		    {songPlayers}
		</ul>
	    </div>
	);
    }

}

export default TopSongs;









