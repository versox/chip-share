import React, { Component } from 'react';
import Tone from 'tone';
import './editor.css';
import './awesome.css';
import APIHelper from '../apiHelper.js';
import Song from './song/EditableSong.js';
import InstrEdit from './InstrEdit.js';
import BlockEdit from './blockEdit/BlockEdit.js';
import Time from './time/Time.js';

class Editor extends Component {  
    constructor(props)
    {
	super(props);
	this.state = {
	    playing: false,
	    error: false,
	    name: "",
	    bpm: 120,
	    key: "",
	    keyType: ""
	};
	this.keysArray = ["C", "D", "E", "F", "G", "A", "B"];
	this.keyOptions = this.keysArray.map((key) => {
	    return (<option>{key}</option>);
	});
	this.ready = false;
	this.songId = props.match.params.id;
	if (this.songId === "new") {
	    this.song = new Song();
	    this.song.load();
	    this.song.start();
	    this.ready = true;
	} else if (!(this.songId === undefined)) {
	    APIHelper.getSong(this.songId)
	    .then((res) => {
		return JSON.parse(res);
	    })
	    .then((parsed) => {
		this.song = new Song(parsed);
		this.song.load(parsed);
		this.song.start();
		this.ready = true;
		this.setState({ 
		    name: this.song.name,
		    bpm: this.song.bpm,
		    key: this.song.freq,
		    keyType: this.song.keyType
		});
		this.forceUpdate();
	    })
	    .catch((err) => {
		this.state.error = true;
		this.state.errComp = <h1> Could not load song: {err} </h1>;
	    });
	}
    }
    
    componentDidMount() {
	if(false && this.song && !this.ready)
	{
	    this.song.load(this.songMeta);
	    this.song.start();
	    this.ready = true;
	    this.forceUpdate();
	}
    }
   
    handleToggle() {
	this.setState(state => ({
	    playing: !state.playing
	}));
	if(this.state.playing) {
	    this.song.pause();
	}
	else {
	    this.song.play();
	}
    }

    onSave(evt) {
	evt.preventDefault();
	this.song.save();
    }

    onChange(evt) {
	let newState = {};
	let val = evt.target.value;
	switch (evt.target.id) {
	    case "name":
		this.song.setName(val);
		break;
	    case "bpm":
		if (val != "") {
		    if (val < 1) {
			val = 1;
		    } else if (val > 500) {
			val = 500;
		    }
		    this.song.setBPM(val);
		}
		break;
	    case "keyType":
		this.song.setKey(this.state.key, val);
		break;
	    case "key":
		this.song.setKey(val, this.state.keyType);
	}	
	newState[evt.target.id] = val;
	this.setState(newState);
    }

    render() {
	if(this.state.error) {
	    return this.state.errComp;
	}
	if(!this.song || !this.ready) {
	    return ( <div> </div> );
	}

	return (
	    <div class="editor">
		<div class="editor-header">
		    <span class="header-left">
		    <i onClick={this.handleToggle.bind(this)} class={"fa " + (this.state.playing ? "fa-stop" : "fa-play")}></i>
		    <div class="header-controls">
		        <span>BPM </span>
		        <input value={this.state.bpm} id='bpm' onChange={evt => this.onChange(evt)} type="number" />
		        <span>Key </span>
		        <select id="key" value={this.state.key} onChange={evt => this.onChange(evt)}>
			    {this.keyOptions}
		        </select>
		        <select onChange={evt => this.onChange(evt)} id="keyType" value={this.state.keyType}>
			    <option>Maj</option>
			    <option>min</option>
		        </select>
		    </div>
		    </span>
		    <div class="song-name">
			<form onSubmit={(evt) => this.onSave(evt)}>
			    <input required onChange={evt => this.onChange(evt)} value={this.state.name} id='name' type='text' placeholder='untitled' class="name-input" />
			    <input type='submit' value="Save" className='btn btn-success' />
			</form>
		    </div>
		</div>
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
