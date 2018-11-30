import React, { Component } from 'react';
import APIHelper from './apiHelper.js';
import SongList from "./SongList";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
		if (this.props.match && this.props.match.params && this.props.match.params.username) {
			APIHelper.fetchUser(this.props.match.params.username)
				.then(user => {
					this.setState({
						loading: false,
						user: user
					});
				})
				.catch(err => {
					if (err.status === 404) {
						this.setState({
							loading: false,
							user: null
						});
					} else {
						// TODO display error
					}
				});
		} else {
			this.state.loading = false;
			this.state.user = null;
		}
	}
	render() {
		if (this.state.loading)
			return (
				<div className="info-box">
					<p>Loading...</p>
				</div>
			);
		else
			return (
				<div>
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-8 offset-lg-2">
								{!this.state.user ?
									<div className="info-box">
										<h1>User Not Found</h1>
										<p>This profile page does not exist.</p>
									</div>
									:
									<div>
										<h1 className="account-name">{this.state.user.name}</h1>
										<span className="account-username">@{this.state.user.username}</span>
										<SongList userId={this.state.user.id}/>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			);
	}
}

export default Profile;
