import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import APIHelper from './apiHelper.js';

class Login extends Component {
    constructor(props)
    {
	super(props);
	this.state = {
	    user: "",
	    pass: "",
	    alertComponent: null
	}
    }

    onSubmit(event)
    {
	event.preventDefault();
	var response = APIHelper.login(this.state.user, this.state.pass);
	var comp = (response === "Success" ? 
		(<Redirect to="/profile"/>) : 
		(<div class="alert alert-danger" role="alert">{response}</div>));
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
		    <h1>Please sign in</h1>
		    <label for="user" class="sr-only">Username</label>
		    <input value={this.state.user} onChange={evt => this.onChange(evt)} type="text" id="user" class="form-control" placeholder="Username" required autofocus />
		    <label for="pass" class="sr-only">Password</label>
		    <input value={this.state.pass} onChange={evt => this.onChange(evt)} type="password" id="pass" class="form-control" placeholder="Password" required />
		    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		    <h3>Don't have an account?</h3>
		    <Link to="/register">Register Here</Link>
		</form>	
		{this.state.alertComponent}
	    </div>
	);
    }
}

export default Login;
