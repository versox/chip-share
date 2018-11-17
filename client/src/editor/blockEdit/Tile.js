import React, { Component } from 'react';

class Tile extends Component {
    constructor(props) {
	super(props);
	this.state = props.tile;
    }

    onMouseMove(event) {
    }

    onMouseDown(event) {
	this.props.dragger.active = this.props.line;
	this.props.dragger.start = this;
	//this.state.startF();
	//this.forceUpdate();
    }

    onMouseUp(event) {
	if(this.props.line === this.props.dragger.active)
	{
	    if(this.props.dragger.start === this)
	    {
		this.state.clickF();
	    }
	    else
	    {
		this.props.dragger.start.state.startF();
		this.props.dragger.start.forceUpdate();
		this.state.endF();
	    }
	    this.forceUpdate();
	}
	this.props.dragger.active = null;
    }

    render() {
	return (
	    <div
		class={"tile " + (this.state.type)}
		onMouseDown={this.onMouseDown.bind(this)}
		onMouseUp={this.onMouseUp.bind(this)}
		onMouseMove={this.onMouseMove.bind(this)}
		>
	    </div>
	);
    }
}

export default Tile;
