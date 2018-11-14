import React, { Component }  from 'react';

class InstrEdit extends Component {
    render(params) {
	return (
	    <div id='instrEdit'>
		<span>Instrument</span>
		<select>
		    <option>Hello</option>
		</select>
		<br />
		<span>Drive</span>
		<input type='number' />
		<input type='range' />
		<br />
		<span>B</span>
		<input type='number' />
		<input type='range' />
		<br />
		<span>C</span>
		<input type='number' />
		<input type='range' />
		<br />
		D
		<br />
		E
	    </div>
	);
    }
}

export default InstrEdit;
