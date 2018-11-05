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

    onClick() {
	if(this.state.active) {
	    this.unset(this.id);
	} else {
	    this.set(this.id);
	}
	this.setState(state => ({
	    active: !state.active 
	}));
    }

    render() {
	return (
	    <div
		class={"tile " + (this.state.active ? "on" : "off")}
		onClick={this.onClick.bind(this)}
		>
		&nbsp;
	    </div>
	);
    }
}

export default Tile;
