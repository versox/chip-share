import React, { Component } from 'react';

class ConclusionPage extends Component {
	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Conclusion</h1>
						<h3>React</h3>
						<div class="progress conclusion-progress">
			  				<div class="progress-bar react-bar">7/10</div>
						</div>
						<br />
						<p>
						Overall, React is a very useful and convenient tool for creating dynamic components for almost any website. 
						The fact that React uses JSX makes the syntax very familiar to anyone with HTML experience. Similarly, 
						JavaScript is a commonly used programming language, making React developer friendly and easy to pick up and use in that sense.
						</p>
						<p>
						However, other React-specific features, such as rendering elements to the DOM, may take some research and time to learn. 
						Furthermore, research on React may be more difficult compared to other frameworks as React lacks properly detailed documentation.
						</p>
						<p>
						Regardless, once the basic features of React are learned, they can be used in many ways to make development exponentially easier.
						React components can be easily reused, such as the navbar in the chipshare website. This means the component does not have to
						be continuously re-rendered.
						</p>
						<h3>Express</h3>
						<div class="progress conclusion-progress">
			                                <div class="progress-bar express-bar">9/10</div>
			                        </div>
						<br />
						<p>
						Express excells in many categories and is a very easily understandable, yet powerful framework. 
						From installation process to managing server databases, Express simplifies every step to creating a good backend API.
						Built-in tools for routing and JSON output also make Express a great choice for backend development.
						It shows that simplicity is key. It stands out to other frameworks due to how much it can accomplish for how uniform it is.
						</p>
						<p>
						Due to Express being such a barebones framework, some developers may find it appalling to resolve in their site.
						Implementation is almost fully up to the user, which some may not like because it lacks fancy features that others may contain.
						However, if you find yourself wishing Express had more features, you may want to consider installing a framework built on top
						of Express, such as MEAN or Feathers.
						</p>
						<a href="http://chipshare.me" className="btn btn-lg btn-success">Chip Share Homepage</a>
					</div>
				</div>
			</div>
		);
	}
}

export default ConclusionPage;
