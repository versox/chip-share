import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import { Link } from 'react-router-dom';

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
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Created the <Link to="/editor/new">editor</Link>.</li>
								<li>Created the skeleton for the client and made routing / page navigation work.</li>
								<li>Made the tutorial for how to create a great looking page.</li>
								<li>Implemented songs on the client. Made them load, play, editable, and saveable.</li>
								<li>Implemented user accounts on the client.</li>
								<li>Responsible for chipshare.me domain name.</li>
							</ul>
						</ScrollArea>
					</div>
					<div className="col-lg-3 col-sm-6 col-8 credits-block">
						<img src="https://avatars2.githubusercontent.com/u/44612512?s=400" />
						<h3>Jake</h3>
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Created installation page, conclusion page, and helped with frameworks page.</li>
								<li>Prototyped navbar, home page, and profile page.</li>
								<li>Styled song editor, aided with main style and page layout.</li>
								<li>Created carousel on home page.</li>
							</ul>
						</ScrollArea>
					</div>
					<div className="col-lg-3 col-sm-6 col-8 credits-block">
						<img src="https://avatars0.githubusercontent.com/u/45542192?s=400" />
						<h3>Mishel</h3>
						<ScrollArea horizontal={false} speed={0.8}>
							<ul>
								<li>Conducted research on the frameworks and created the frameworks page.</li>
								<li>Worked on a tutorial for the song editor.</li>
								<li>Helped with quality assurance of site usability.</li>
								<li>Assisted in adding demo content for Chip Share.</li>
								<li>Learned various new foreign concepts used throughout the project.</li>
							</ul>
						</ScrollArea>
					</div>
				</div>
			</div>
		);
	}
}

export default CreditsPage;
