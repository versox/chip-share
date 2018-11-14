import React, { Component } from 'react';
import Tone from 'tone';
import './editor.css';
import './awesome.css';
import InstrEdit from './InstrEdit.js';
import BlockEdit from './BlockEdit.js';

class Editor extends Component {  
    constructor(props)
    {
	super(props);
	this.state = {
	    playing: false,
	};
	this.block = [];
	for(let i = 0; i < 12; i++)
	{
	    let line = [];
	    for(let j = 0; j < 16; j++)
	    {
		line.push({
		    type: 'off',
		    clickF: function() {
			if(this.type === 'off')
			{
			    this.type = 'on';
			}
			else
			{
			    this.type = 'off';
			}
		    },
		    startF: function() {
			this.type = 'start';
		    },
		    endF: function() {
			this.type = 'end';
		    },
		    midF: function() {
			this.type = 'mid';
		    }
		});
	    }
	    this.block.push(line);
	}
    }
    
    componentDidMount() {
	this.synth = new Tone.Synth({
	    oscillator: {
		type: 'sawtooth'
	    },
	    envelope: {
		attack: 0.005,
		decay: 0.1,
		sustain: 0.3,
		release: 1
	    }
	}).toMaster();

	this.synth = new Tone.PolySynth(16, Tone.Synth).toMaster();
	Tone.Transport.loopEnd = '1m';
	Tone.Transport.loop = true;
	//Tone.Transport.bpm.value = ;

	this.looper = {
	    count: 0,
	}

	this.key = [
	    'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3'
	];

	var loopF = function() {
	    console.log(this.block);
	    for(let i = 0; i < 12; i++)
	    {
		    if(this.block[i][this.looper.count].type === 'on')
		    {
			this.synth.triggerAttackRelease(this.key[i], '16n');
		    }
		    else if(this.block[i][this.looper.count].type === 'start')
		    {
			this.synth.triggerAttack(this.key[i]);
		    }
		    else if(this.block[i][this.looper.count].type === 'end')
		    {
			this.synth.triggerRelease(this.key[i]);
		    }
		
	    }
	    if(this.looper.count >= 15)
	    {
		this.looper.count = 0;
	    }
	    else
	    {
		this.looper.count++;
	    }
	}
	
	this.loop = new Tone.Loop(loopF.bind(this), '16n').start(0);
    }
   
    handleToggle() {
	this.setState(state => ({
	    playing: !state.playing
	}));
	if(this.state.playing) {
	    Tone.Transport.stop();
	    this.synth.releaseAll();
	}
	else {
	    Tone.Transport.start();
	}
    }

    render() {
	return (
	    <div class="editor">
		<i onClick={this.handleToggle.bind(this)} class={"fa " + (this.state.playing ? "fa-stop" : "fa-play")}></i>
		<div class="row">
		    <InstrEdit />
		    <BlockEdit block={this.block} />
		</div>
   	    </div>
	);
    }
}

export default Editor;
