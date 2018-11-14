import React, { Component } from 'react';

import Line from './Line.js';

class BlockEdit extends Component {
    constructor(props) {
	super(props);
	this.dragger = {
	    active: -1,
	    start: null
	}
    }
    
    render() {
	let lines = [];
	for(let i = 0; i < 12; i ++)
	{
	    lines.push(<Line line={this.props.block[i]} lineNum={i} dragger={this.dragger} />);
	}
	return (
	    <div id='blockEdit'>
		{lines}
	    </div>
	);
    }
}

export default BlockEdit;
