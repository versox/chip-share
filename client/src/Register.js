import React, { Component } from 'react';
import APIHelper from './apiHelper.js';

class Register extends Component {
    constructor(props)
    {
	super(props);
	this.state = {
	    name: "",
	    user: "",
	    pass: ""
	}
    }

    onSubmit()
    {
	console.log(APIHelper.register(this.state.name, this.state.user, this.state.pass));
    }

    onChange(evt)
    {
	var newState = {};
	newState[evt.target.id] = evt.target.value; 
	this.setState(newState);
    }
    
    render() {
	return (
	    <div>
		<form onSubmit={() => this.onSubmit()} class="form-signin">
		    <h1>Register</h1>
		    <input value={this.state.name} onChange={evt => this.onChange(evt)} type="text" id="name" class="form-control" placeholder="Name" required autofocus /> 
		    <input value={this.state.user} onChange={evt => this.onChange(evt)} type="text" id="user" class="form-control" placeholder="Username" required />
		    <input value={this.state.pass} onChange={evt => this.onChange(evt)} type="password" id="pass" class="form-control" placeholder="Password" required />
		    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
		</form>
	    </div>
	);
    }
}

export default Register;
