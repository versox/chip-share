import React, { Component }  from 'react';

class InstrEdit extends Component {
    render(params) {
	return (
	    <div id='instrEdit'>
		<span>Instrument </span>
		<select>
		    <option>Instrument 1</option>
		    <option>Instrument 2</option>
		    <option>Instrument 3</option>
		</select>
		<br />
		<span>Drive </span>
		<input type='number' />
		<input type='range' />
		<br />
		<span>Value 2 </span>
		<input type='number' />
		<input type='range' />
		<br />
		<span>Value 3 </span>
		<input type='number' />
		<input type='range' />
	    </div>
	);
    }
}

export default InstrEdit;
