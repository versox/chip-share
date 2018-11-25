import React, { Component } from 'react';

class TutorialPage extends Component {
	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Tutorial</h1>

						<h2>Chip Share</h2>
						<p>For our demo website, we have created an online chiptune song sharing website. You can create new songs, adapt from the songs of other users, or simply browser the site and rate the previously submitted songs.</p>
						<a href="/" className="btn btn-lg btn-success">ChipShare Homepage</a>
					</div>
				</div>
			</div>
		);
	}
}

export default TutorialPage;