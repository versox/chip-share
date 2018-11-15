import React, { Component } from 'react';
import Track from './Track.js';

class Time extends Component {
    constructor(props)
    {
	super(props);
	this.id = 1;
	this.state = {
	    tracks: [<Track id='0' remove={this.removeTrack.bind(this)} />]
	}
	this.offset = 0;
    }

    addTrack()
    {
	var copy = this.state.tracks.slice(0);
	copy.push(<Track id={this.id} remove={this.removeTrack.bind(this)}/>);
	this.setState(state => ({
	    tracks: copy
	}));
	this.id++;
    }

    removeTrack(me)
    {
	this.setState(state => ({
	    tracks: state.tracks.filter(function(value) {
		return !(me.props.id === value.props.id);
	    })
	}));
    }

    render()
    {
	return (
	    <div>
		{this.state.tracks}
		<h1 onClick={this.addTrack.bind(this)}>Create track</h1>
	    </div>
	);
    }
}

export default Time;
