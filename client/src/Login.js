import React, { Component } from 'react';

class Login extends Component {
    constructor(props)
    {
	super(props);
	this.state = {
	    user: "",
	    pass: ""
	}
    }

    onSubmit()
    {
	console.log(this.state.user + " " + this.state.pass);
    }

    onChange(evt)
    {
	console.log(evt);
	var updateState = function()
	{
	    var newState = {};
	    newState[evt.target.id] = evt.target.value;
	    return newState;
	}
	this.setState(
	    () => updateState()
	    //{
	    //var newState = {};
	    //newState[evt.target.id] = evt.target.value;
	    //return newState;
	    //user: evt.target.value
	    //}
	);
    }
    
    render() {
	return (
	    <div>
		<form onSubmit={() => this.onSubmit()}>
		    <input id='user' value={this.state.user} onChange={evt => this.onChange(evt)} type='text' />
		    <input id='pass' value={this.state.password} onChange={evt => this.onChange(evt)} type='password' />
		    <input type='submit' />
		</form>
	    </div>
	);
    }
}

export default Login;
