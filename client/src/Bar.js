import React, { Component } from 'react';
import Tile from './Tile.js'

class Bar extends Component {

    constructor(params) {
	super(params);
	this.synth = params.synth;
	this.note = params.note;
	this.tileActive = [
	    false, false, false, false, false, false, false, false
	];
	params.register(this.barPlay.bind(this));
    }

    barPlay(time, tile) {
	if(this.tileActive[tile]) {
	    this.synth.triggerAttackRelease(this.note, '8n');
	}
    }

    setTile(index) {
	this.tileActive[index] = true;
    }

    unsetTile(index) {
	this.tileActive[index] = false;
    }

    render(params) {
	return (
	    <div class="bar">
		<Tile id='0' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='1' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='2' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='3' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='4' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='5' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='6' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
		<Tile id='7' set={this.setTile.bind(this)} unset={this.unsetTile.bind(this)}/>
	    </div>
	);
    }
}

export default Bar;
