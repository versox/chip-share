import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';

class CreditsPage extends Component {
	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Credits</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-3 col-sm-6 col-8 credits-block">
						<img src="https://avatars2.githubusercontent.com/u/44684541?s=400" />
						<h3>Alexander</h3>
						<a href="https://github.com/alxyaro" title="Github Account">github.com/alxyaro</a>
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Created the entirety of the backend REST API for Chip Share.</li>
								<li>Implemented a token-based authorization system for user accounts.</li>
								<li>Developed a custom binary storage format for songs.</li>
								<li>Wrote up descriptive and fully encompassing documentation for the API.</li>
								<li>Designed the song players.</li>
								<li>Implemented a sequential-fetching song list.</li>
								<li>Designed and implemented the final login and registration pages.</li>
								<li>Fixed various song player & editor related issues.</li>
								<li>Set up an automatic fetching script for production builds of the application.</li>
								<li>Hosted the project.</li>
							</ul>
						</ScrollArea>
					</div>
					<div className="col-lg-3 col-sm-6 col-8 credits-block">
						<img src="https://avatars3.githubusercontent.com/u/6993228?s=400" />
						<h3>Carson</h3>
						<a href="https://github.com/versox" title="Github Account">github.com/versox</a>
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent hash</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
							</ul>
						</ScrollArea>
					</div>
					<div className="col-lg-3 col-sm-6 col-8 credits-block">
						<img src="https://avatars2.githubusercontent.com/u/44612512?s=400" />
						<h3>Jake</h3>
						<a href="https://github.com/briltz" title="Github Account">github.com/briltz</a>
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Created installation page, conclusion page, and helped with frameworks page</li>
								<li>Prototyped navbar, home page, and profile page</li>
								<li>Styled song editor, aided with main style and page layout</li>
								<li>Created carousel on home page</li>
							</ul>
						</ScrollArea>
					</div>
					<div className="col-lg-3 col-sm-6 col-8 credits-block">
						<img src="https://avatars0.githubusercontent.com/u/45542192?s=400" />
						<h3>Mishel</h3>
						<a href="https://github.com/galperinmishel" title="Github Account">github.com/galperinmishel</a>
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent hash</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
								<li>Lorem ipsum dolor sit amet, ex movet putent has</li>
							</ul>
						</ScrollArea>
					</div>
				</div>
			</div>
		);
	}
}

export default CreditsPage;
