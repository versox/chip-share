import React, { Component } from 'react';
import Tone from 'tone';
import './style.css';
import Bar from './Bar.js';

class Editor extends Component {  
    constructor(props) {
	super(props);
	this.synth = new Tone.Synth().toMaster();
	Tone.Transport.loopEnd = '1m';
	Tone.Transport.loop = true;
	this.state = {
	    playing: false,
	};
    }

    registerBarPlay(barPlay) {
	for(let i = 0; i <= 7; i++)
	{
	   Tone.Transport.schedule(function(time) {
	       return barPlay(time, i);
	    },("0:0:" + (i*2)));
	}
    }
   
    handleToggle() {
	this.setState(state => ({
	    playing: !state.playing
	}));
	if(this.state.playing) {
	    Tone.Transport.stop();
	}
	else {
	    Tone.Transport.start();
	}
    }

    render() {
	return (
	    <div class="editor">
		<h1 onClick={this.handleToggle.bind(this)}>{this.state.playing ? "Stop" : "Play"}</h1>
		<Bar note='C4' register={this.registerBarPlay} synth={this.synth}/>
		<Bar note='D4' register={this.registerBarPlay} synth={this.synth}/>
		<Bar note='E4' register={this.registerBarPlay} synth={this.synth}/>
		<Bar note='F4' register={this.registerBarPlay} synth={this.synth}/>
		<Bar note='G4' register={this.registerBarPlay} synth={this.synth}/>
    	    </div>
	);
    }
}

export default Editor;
