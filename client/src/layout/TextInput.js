import React, { Component } from 'react';

class TextInput extends Component {
	getValue() {
		return this.refs.input.value;
	}
	render() {
		return (
			<div className="form-group">
				<input ref="input" name={this.props.name} onChange={() => this.props.fieldErrors[this.props.name] ? this.props.hideError(this.props.name) : {}} type={this.props.type || 'text'} className={'form-control'+(this.props.fieldErrors[this.props.name] ? ' is-invalid' : '')} placeholder={this.props.placeholder || ''} />
				<div className="invalid-feedback">{this.props.fieldErrors[this.props.name] || ''}</div>
			</div>
		);
	}
}

export default TextInput;