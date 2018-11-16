import React, { Component } from 'react';
import Block from './Block.js';

class Track extends Component {


    remove() {
	this.props.remove(this);
    }

    render() {
	return (
	    <div className="track">
		<h1 onClick={this.remove.bind(this)}>{this.props.id}</h1>
		<Block />
	    </div>
	);
    }
}

export default Track;
