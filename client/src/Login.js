import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import APIHelper from './apiHelper.js';
import constants from "./constants";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fieldErrors: {},
			error: null,
			redirect: null
		}
	}
	onSubmit(event) {
		event.preventDefault();
		if (this.refs.username.value.length === 0 || this.refs.password.value.length === 0) {
			this.setState({
				errors: null,
				fieldErrors: {
					username: this.refs.username.value.length === 0 ? 'This field is required' : null,
					password: this.refs.password.value.length === 0 ? 'This field is required' : null
				}
			});
			return;
		}
		const request = APIHelper.login(this.refs.username.value, this.refs.password.value);
		switch (request.status) {
			case 200:
				this.setState({
					redirect: constants.ROOT_PATH+'profile/'+this.refs.username.value.toLowerCase()
				});
				break;
			case 400:
				let fieldErrors = null;
				try {
					fieldErrors = JSON.parse(request.response).fieldErrors;
				} catch (e) {}
				this.setState({
					error: null,
					fieldErrors: fieldErrors
				});
				break;
			default:
				let message = "Unknown error occurred.";
				try {
					message = JSON.parse(request.response).message;
				} catch (e) {}
				this.setState({
					error: message.charAt(0).toUpperCase()+message.substring(1)+'.',
					fieldErrors: {}
				});
		}
	}
	hideError(input) {
		const fieldErrors = this.state.fieldErrors;
		delete fieldErrors[input];
		this.setState({
			fieldErrors: fieldErrors
		});
	}
	render() {
		return this.state.redirect ? <Redirect to={this.state.redirect} /> :
		(
			<div className="container">
				<div className="row">
					<div className="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3 col-10 offset-1">
						<form onSubmit={(evt) => this.onSubmit(evt)} className="form-login">
							<h1>Login</h1>
							<div className="form-group">
								<input ref="username" onChange={() => this.state.fieldErrors.username ? this.hideError('username') : {}} type="text" className={'form-control'+(this.state.fieldErrors.username ? ' is-invalid' : '')} placeholder="Username" />
								<div className="invalid-feedback">{this.state.fieldErrors.username || ''}</div>
							</div>
							<div className="form-group">
								<input ref="password" onChange={() => this.state.fieldErrors.password ? this.hideError('password') : {}} type="password" className={'form-control'+(this.state.fieldErrors.password ? ' is-invalid' : '')} placeholder="Password" />
								<div className="invalid-feedback">{this.state.fieldErrors.password || ''}</div>
							</div>
							<div className="form-group">
								{this.state.error &&
								<div style={{'margin': '-10px 0 5px'}}><small className="text-warning">{this.state.error}</small></div>
								}
								<button className="btn btn-light" type="submit">Login</button>
							</div>
						</form>
						<hr />
						<div className="register-prompt">
							<h2>Don't have an account?</h2>
							<Link to="/register">Register Here</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
