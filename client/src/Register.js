import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import APIHelper from './apiHelper.js';
import TextInput from "./layout/TextInput";
import constants from "./constants";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fieldErrors: {},
			error: null,
			redirect: null,
			captcha: null
		};
		APIHelper.getCaptcha()
			.then((response) => {
				this.captchaKey = response.captcha.key;
				//const captcha = new DOMParser().parseFromString(parsed.captcha.image, "text/xml").firstChild;
				this.setState({
					captcha: <div dangerouslySetInnerHTML={{__html: response.captcha.image}}></div>
				})
			})
			.catch(() => {
				this.setState({
					captcha: 'Failed to load!'
				})
			});
	}
	onSubmit(event) {
		event.preventDefault();
		if (this.ensureErrorCorrection && Object.keys(this.state.fieldErrors).length > 0)
			return;
		const inputData = {
			name: this.refs.name.getValue(),
			username: this.refs.username.getValue(),
			password: this.refs.password.getValue(),
			captcha: this.refs.captcha.getValue()
		};
		let clientError = false;
		for (const key in inputData) {
			if (inputData[key].length === 0) {
				this.state.fieldErrors[key] = 'This field is required.';
				this.forceUpdate();
				clientError = true;
			}
		}
		if (this.refs['repeat-password'].getValue() !== this.refs.password.getValue()) {
			this.state.fieldErrors['repeat-password'] = 'Passwords do not match.';
			this.forceUpdate();
			clientError = true;
		}
		if (clientError)
			return;
		const request = APIHelper.register(inputData, this.captchaKey);
		switch (request.status) {
			case 201:
				const loginRequest = APIHelper.login(inputData.username, inputData.password);
				this.setState({
					redirect: loginRequest.status === 200 ? constants.ROOT_PATH+'profile/'+inputData.username.toLowerCase() : constants.ROOT_PATH+'login'
				});
				break;
			case 400:
				let fieldErrors = null;
				try {
					const json = JSON.parse(request.response);
					fieldErrors = json.fieldErrors || {};
					if (json.captchaError)
						fieldErrors.captcha = json.captchaError
				} catch (e) {}
				this.setState({
					error: null,
					fieldErrors: fieldErrors
				});
				this.ensureErrorCorrection = true;
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
							<h1>Register</h1>
							<TextInput ref="name" name="name" placeholder="Name" fieldErrors={this.state.fieldErrors} hideError={this.hideError.bind(this)} />
							<TextInput ref="username" name="username" placeholder="Username" fieldErrors={this.state.fieldErrors} hideError={this.hideError.bind(this)} />
							<TextInput ref="password" name="password" type="password" placeholder="Password" fieldErrors={this.state.fieldErrors} hideError={this.hideError.bind(this)} />
							<TextInput ref="repeat-password" name="repeat-password" type="password" placeholder="Repeat Password" fieldErrors={this.state.fieldErrors} hideError={this.hideError.bind(this)} />
							<div className="captcha-group">
								<div className="captcha-container">{this.state.captcha || 'Loading captcha...'}</div>
								<TextInput ref="captcha" name="captcha" placeholder="Captcha Answer" fieldErrors={this.state.fieldErrors} hideError={this.hideError.bind(this)} />
							</div>
							<button className="btn btn-primary" type="submit">Register</button>
						</form>
						<hr />
						<div className="register-prompt">
							<h2>Already have an account?</h2>
							<Link to="/login">Login Here</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
