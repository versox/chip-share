import React, { Component } from 'react';
import Tone from 'tone';
import './editor.css';
import './awesome.css';
import Song from './song/Song.js';
import InstrEdit from './InstrEdit.js';
import BlockEdit from './blockEdit/BlockEdit.js';
import Time from './time/Time.js';

class Editor extends Component {  
    constructor(props)
    {
	super(props);
	this.state = {
	    playing: false,
	};
	Tone.Transport.loop = true;
	this.song = new Song();
	this.song.load();
    }
    
    componentDidMount() {
	this.song.start();
    }
   
    handleToggle() {
	this.setState(state => ({
	    playing: !state.playing
	}));
	if(this.state.playing) {
	    Tone.Transport.stop();
	    this.song.synth.releaseAll();
	}
	else {
	    Tone.Transport.start();
	}
    }

    onSave() {
	this.song.save();
    }

    render() {
	return (
	    <div class="editor">
		<h1>Song name:</h1>
		<input type='text' placeholder='my song' />
		<button onClick={() => this.onSave()} type='button' className='btn btn-success'>Save</button>
		<br/>
		<i onClick={this.handleToggle.bind(this)} class={"fa " + (this.state.playing ? "fa-stop" : "fa-play")}></i>
		<div class="row">
		    <InstrEdit />
		    <BlockEdit block={this.song.activeBlock} />
		</div>
		<Time />
   	    </div>
	);
    }
}

export default Editor;
