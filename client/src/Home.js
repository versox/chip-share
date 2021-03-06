import React, { Component } from 'react';
import constant from './constants.js';
import SongList from "./SongList";
import Link from "react-router-dom/es/Link";

class Home extends Component {

	constructor(props) {
		super(props);
		this.slide1 = {
			backgroundImage: 'url(' + constant.ROOT_PATH + 'assets/Slide1.png)'
		};
		this.slide2 = {
			backgroundImage: 'url(' + constant.ROOT_PATH + 'assets/Slide2.png)'
		};
		this.slide3 = {
			backgroundImage: 'url(' + constant.ROOT_PATH + 'assets/Slide3.png)'
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
								<div class="slide">
									<h1 class="slide-cap">Create 8-Bit Music in Just Minutes</h1>
								</div>
							</div>
							<div className="carousel-item" style={this.slide2}>
								<div class="slide">
									<h1 class="slide-cap">Perfect For Retro-Style Games</h1>
								</div>
							</div>
							<div className="carousel-item" style={this.slide3}>
								<div class="slide">
									<h1 class="slide-cap">Get Started With Our Free Chiptune Editor</h1>
								</div>
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
							<SongList popular={true} />
						</div>
						<div className="col-lg-3 col-md-4">
							<h3>About</h3>
							<p>Chip Share is a chiptune song sharing website! It is developed using the <a href="https://reactjs.org/">React</a> framework for the front-end, and <a href="https://expressjs.com/">Express</a> for the back-end.</p>
							<p>This school project has been collectively developed by Jake, Carson, Mishel, and Alex at Ryerson University, Toronto, Canada.</p>
							<h3>Get Started</h3>
							<p>Try out our custom chiptune editor to create your very own songs! Simply <Link to={'/register'}>create an account</Link> and play around to master the art of 8-bit music!</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
