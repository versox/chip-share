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
						<p>
							React is a flexible and efficient front end javascript library for building UI, and is considered the most in demand in the job markets of 2018.<br />
							It's also considered as one of the most popular javascript frameworks these days.<br />
							Big companies like Twitter, Netflix, Instagram and Airbnb are using React framework.
						</p>
						<h2>Express</h2>
						<p>
							Express.js is among the top Node.js frameworks.<br />
							Express framework has a minimalist outline that allows the developer to take control of each project and how it will be organized. This provides great flexibility but can be a bit overwhelming to those who are new to Node.js.<br />
							Express is utilized in many major corporations, including but not limited to IBM, Uber, Fox Sports, Mulesoft, etc.
						</p>
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
