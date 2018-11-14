import React, { Component } from 'react';
import Tile from './Tile.js';

class Line extends Component {
    render() {
	let tiles = [];
	for(let i = 0; i < 8; i++)
	{
	    tiles.push(<Tile tile={this.props.line[i]} line={this.props.lineNum} dragger={this.props.dragger} />);
	}
	return (
	    <div class='line'>
		{tiles}	
	    </div>
	);
    }
}

export default Line;
