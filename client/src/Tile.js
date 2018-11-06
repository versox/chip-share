import React, { Component } from 'react';

class Tile extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    active: false
	};
	this.set = props.set;
	this.unset = props.unset;
	this.id = props.id;
    }

    toggle() {
	if(this.state.active) {
	    this.unset(this.id);
	} else {
	    this.set(this.id);
	}
	this.setState(state => ({
	    active: !state.active 
	}));
    }
    
    onMouseDown(event) {
	console.log(this.id);
	this.toggle();
    }

    onMouseUp(event) {
	console.log(this.id);
	this.toggle();
    }

    render() {
	return (
	    <div
		class={"tile " + (this.state.active ? "on" : "off")}
		onClick={this.toggle.bind(this)}
		onMouseDown={this.onMouseDown.bind(this)}
		onMouseUp={this.onMouseUp.bind(this)}
		>
	    </div>
	);
    }
}

export default Tile;
