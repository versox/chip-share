import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import APIHelper from './apiHelper.js';

class Register extends Component {
    constructor(props)
    {
	super(props);
	this.state = {
	    name: "",
	    user: "",
	    pass: "",
	    alertComponent: null
	}
    }

    onSubmit(event)
    {
	event.preventDefault();
	var response = APIHelper.register(this.state.name, this.state.user, this.state.pass);
	var comp;
	if (response === "Success")
	{
	    APIHelper.login(this.state.user, this.state.pass);
	    comp = <Redirect to="/profile"/>;
	}
	else
	{
	    comp = <div class="alert alert-danger" role="alert">{response}</div>;
	}
	this.setState({
	    alertComponent: comp
	});
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
		<form onSubmit={(evt) => this.onSubmit(evt)} class="form-signin">
		    <h1>Register</h1>
		    <input value={this.state.name} onChange={evt => this.onChange(evt)} type="text" id="name" class="form-control" placeholder="Name" required autofocus /> 
		    <input value={this.state.user} onChange={evt => this.onChange(evt)} type="text" id="user" class="form-control" placeholder="Username" required />
		    <input value={this.state.pass} onChange={evt => this.onChange(evt)} type="password" id="pass" class="form-control" placeholder="Password" required />
		    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
		    <h3>Already have an account?</h3>
		    <Link to="/login">Login Here</Link>
		</form>
		{this.state.alertComponent}
	    </div>
	);
    }
}

export default Register;
