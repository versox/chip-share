import React, { Component } from 'react';

class FrameworksPage extends Component {
	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Frameworks</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt dui ut ornare. Viverra aliquet eget sit amet tellus. Duis convallis convallis tellus id interdum velit laoreet.</p>
						<h2>Express</h2>
						<p>Risus feugiat in ante metus dictum. Semper feugiat nibh sed pulvinar. Cras semper auctor neque vitae tempus quam. Cras semper auctor neque vitae tempus quam pellentesque. Viverra justo nec ultrices dui sapien.</p>
						<ul>
							<li>Express is one of the most supported Node.js frameworks. It has an open-source community.</li>
							<li>Express is well-documented.</li>
							<li>Express id easy to learn.</li>
                                <li>The code organization in Express is represented by patterns that make your code easier to maintain.</li>
						</ul>
						<p>Tristique magna sit amet purus gravida quis blandit. Odio tempor orci dapibus ultrices in iaculis nunc. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio.</p>
						<ul>
							<li>If all the code is written in callbacks, it will entangle the code, and it will be hard to maintain.</li>
							<li>Drawback 2</li>
							<li>Drawback 3</li>
						</ul>
						<h2>React</h2>
						<h3>Popularity</h3>
						<p>
						</p>
						<h3>Strengths</h3>
						<ul>
							<li>Virtual Document Object Model, that allows arranging documents in HTML format into a tree from which is better acceptable by web browsers while parsing different elements of the web app.</li>
							<li>100% open source JavaScript library which get everyday updates and improvements according to the contributions of developers all over the world.</li>
                                			<li>Light-weighted because the data performing on the user side can be easily represented on the server side simultaneously.</li>
						</ul>
						<h3>Weaknesses</h3>
						<p>
						</p>
						<ul>
							<li>React JS requires deep knowledge</li>
							<li>Takes time to learn</li>
						</ul>
						<h3>Usage</h3>
						<hr />
						<a href="/assignment/installation" className="btn btn-lg btn-primary">Continue to Installation</a>
					</div>
				</div>
			</div>
		);
	}
}

export default FrameworksPage;
