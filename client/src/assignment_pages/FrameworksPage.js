import React, { Component } from 'react';

class FrameworksPage extends Component {
	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Frameworks</h1>
						<p>For our project, two major frameworks were used, namely React and Express, both stemming from the Node.js environment. The following is a brief explanation of both frameworks.</p>
						<h2>React</h2>
						<h4>Popularity</h4>
						<p>
			                        React is a flexible and efficient front end javascript library for building UI, and is considered the most in demand in the job markets of 2018.<br />
			                        It's also considered as one of the most popular javascript frameworks these days.<br />
			                        </p>
						<h4>Strengths</h4>
						<ul>
							<li>Virtual Document Object Model, that allows the user to arrange documents in HTML format into a tree form which is more acceptable by web browsers while parsing different elements of the web app.</li>
							<li>100% open source JavaScript library which recieves daily updates and improvements according to the contributions of developers all over the world.</li>
                                			<li>Light-weighted because the data performing on the user side can be easily represented on the server side simultaneously.</li>
						</ul>
						<h4>Weaknesses</h4>
						<p>
						</p>
						<ul>
							<li>React JS requires extensive JavaScript knolwedge</li>
							<li>Lack of proper documentation</li>
						</ul>
						<h4>Usage</h4>
						<p>
						Big companies like Twitter, Netflix, Instagram and Airbnb are using React framework.
						</p>
						<img src="https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_200x200.png" alt="Facebook" class="usage"/>
						<img src="https://pbs.twimg.com/profile_images/1013798240683266048/zRim1x6M.jpg" alt="Twitter" class="usage"/>
						<img src="https://www.themarysue.com/wp-content/uploads/2011/02/netflix-logo-square.jpg" alt="Netflix" class="usage"/>
						<img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-square2-512.png" alt="Instagram" class="usage"/>
						<img src="https://pbs.twimg.com/profile_images/933353721400037377/1WtmW5o5_400x400.jpg" alt="Airbnb" class="usage"/>
						<br /><br />
						<h2>Express</h2>
						<p>Express is a javascript framework that is used to make web servers. It allows for the handling of HTTP GET / POST requests as well as serving a variety of dynamic content.</p>
						<img style={{width: '200px', height: 'auto', float: 'right'}} src="https://amandeepmittal.gallerycdn.vsassets.io/extensions/amandeepmittal/expressjs/2.0.0/1509881293872/Microsoft.VisualStudio.Services.Icons.Default"></img>
						<h4>Popularity</h4>
						<p>One of the most depended upon NPM packages (<a href="https://www.npmjs.com/browse/depended">https://www.npmjs.com/browse/depended</a>), express has been downloaded 26 million times and is very popular among javascript developers. </p>
						<h4>Strengths</h4>
						<ul>
							<li>Issues are fixed quickly because express is open source and popular.</li>
							<li>Well-documented.</li>
							<li>Easy to learn.</li>
							<li>Simple if you're making something small.</li>
							<li>Works well with a variety of other node.js packages.</li>
						</ul>
						<h4>Weaknesses</h4>
						<ul>
							<li>There is no universal way of doing things.</li>
							<li>Hard to use correctly because of the open endedness</li>
							<li>Can get confusing for large scale projects.</li>
						</ul>
						<h4>Usage</h4>
						<p>Express is utilized in many major corporations, including but not limited to IBM, Uber, Fox Sports, Mulesoft, etc.</p>	
						<h4>References</h4>
						<ul style={{fontSize: '12px', marginBottom: '10px'}}>
							<li>Kostrzewa, Denis. "Is React.js the Best Javascript Framework in 2018? – Hacker Noon." Hacker Noon, Hacker Noon, 19 July 2018, hackernoon.com/is-react-js-the-best-javascript-framework-in-2018-264a0eb373c8.</li>
							<li>Park, Jae Sung. "The Status of JavaScript Libraries & Frameworks: 2018 & beyond." Hacker Noon, Hacker Noon, 30 Mar. 2018, hackernoon.com/the-status-of-javascript-libraries-frameworks-2018-beyond-3a5a7cae7513.</li>
							<li>Volodymyr, Tymets. "Express.js Mobile App Development: Pros and Cons of Node.js Framework." Apiko Blog, Apiko Blog, 22 Mar. 2018, apiko.com/blog/express-mobile-app-development/.</li>
							<li>"Why Developers like React." StackShare, stackshare.io/react/in-stacks.</li>
						</ul>
						<hr />
						<a href="/assignment/installation" className="btn btn-lg btn-primary">Continue to Installation</a>
					</div>
				</div>
			</div>
		);
	}
}

export default FrameworksPage;
