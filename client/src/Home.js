import React, { Component } from 'react';

class Home extends Component {

	constructor(props) {
		super(props);
		this.slide1 = {
			backgroundImage: 'url(/assets/Slide1.png)'
		};
		this.slide2 = {
			backgroundImage: 'url(/assets/Slide2.png)'
		};
		this.slide3 = {
			backgroundImage: 'url(/assets/Slide3.png)'
		};
	}

	render() {
		return (
			<div>
				<header>
					<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
						<ol className="carousel-indicators">
							<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
							<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
							<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
						</ol>
						<div className="carousel-inner" role="listbox">
							<div className="carousel-item active" style={this.slide1}>
								<button type="button" className="btn btn-light carousel-button">View The Tutorial</button>
							</div>
							<div className="carousel-item" style={this.slide2}>
								<button type="button" className="btn btn-light carousel-button">Listen To Example Songs</button>
							</div>
							<div className="carousel-item" style={this.slide3}>
								<button type="button" className="btn btn-light carousel-button">Create a New Song</button>
							</div>
						</div>
						<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="sr-only">Previous</span>
						</a>
						<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="sr-only">Next</span>
						</a>
					</div>
				</header>
				<div className="container content">
					<div className="row">
						<div className="col-lg-9 col-md-8">
							<h3>Popular Songs</h3>
							<ul className="song-list">
								<li>
									<div className="song-header" style={{background: '#00ff9545'}}>
										<button className="btn btn-light playback-btn play-btn"></button>
										<div className="song-title">Sample Song</div>
										<div className="play-progress" style={{width: '60%'}}></div>
										<div className="buttons-container">
											<button className="btn btn-light"><i className="fa fa-pencil"></i></button>
											<button className="btn btn-light"><i className="fa fa-trash"></i></button>
										</div>
									</div>
									<div className="song-body">
										<div className="song-dates">
											<span className="song-creation-date">Created November 15, 2018</span>
											<span className="song-update-date">Updated November 16, 2018</span>
										</div>
										<a href="#" className="song-artist">
											<div className="name">Artist Name</div>
											<div className="username">@johnsmith</div>
										</a>
									</div>
								</li>
								<li>
									<div className="song-header" style={{background: '#cc00ff45'}}>
										<button className="btn btn-light playback-btn pause-btn"></button>
										<div className="song-title">Best Song Ever</div>
										<div className="play-progress" style={{width: '30%'}}></div>
									</div>
									<div className="song-body">
										<div className="song-dates">
											<span className="song-creation-date">Created October 29, 2018</span>
										</div>
										<a href="#" className="song-artist">
											<div className="name">Another Artist</div>
											<div className="username">@XxXusernameXxX</div>
										</a>
									</div>
								</li>
							</ul>
						</div>
						<div className="col-lg-3 col-md-4">
							<h3>About</h3>
							<p>Chip Share is a chiptune song editor right on your browser! It is developed using <a href="https://reactjs.org/">ReactJS</a> as a front-end framework and <a href="https://expressjs.com/">Express</a> back-end framework.</p>
							<p>The project is the result of a school project collectively developed by Jake, Carson, Mishel, and Alex at Ryerson University, Toronto, Canada.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
