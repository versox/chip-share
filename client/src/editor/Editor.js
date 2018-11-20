import React, { Component } from 'react';
import Tone from 'tone';
import './editor.css';
import './awesome.css';
import APIHelper from '../apiHelper.js';
import Song from './song/EditableSong.js';
import InstrEdit from './InstrEdit.js';
import BlockEdit from './blockEdit/BlockEdit.js';
import Time from './time/Time.js';

const staticSongMeta = {
		updateDate:"2018-11-18T22:04:55.797Z",
		name:"awesome song",
		bpm:120,
		blockLength:1,
		instruments:[{
		    blocks:[1],
		    settings:{
			typeId:1,
			metadata:"123ab"}}]
		,blocks:{
		    1:{
			data:[
			    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
			    [0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}},
		createDate:"2018-11-18T22:04:55.794Z",
		user:{
		    name:"carson",
		    username:"carson",
		    id:"5bf1dee71f92600642c6c279"},
		id:"5bf1e2071f92600642c6c27c"};

class Editor extends Component {  
    constructor(props)
    {
	super(props);
	this.state = {
	    playing: false,
	    error: false
	};
	this.keys = {
	    c: [],
	    d: [],
	    e: [],
	    f: [],
	    g: []
	};
	this.keysArray = Object.keys(this.keys);
	this.options = this.keysArray.map((key) => {
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

    onSave() {
	this.song.save();
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
		    <i onClick={this.handleToggle.bind(this)} class={"fa " + (this.state.playing ? "fa-stop" : "fa-play")}></i>
		    <div class="">
		    <span>BPM </span>
		    <input type="number" />
		    <span>Key </span>
		    <select>
		    {this.options}
		    </select>
		    <select>
		    <option>Minor</option>
		    <option>Major</option>
		    </select>
		    <div class="song-name">
		        <input type='text' placeholder='my song' class="name-input" />
		        <button onClick={() => this.onSave()} type='button' className='btn btn-success'>Save</button>
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
