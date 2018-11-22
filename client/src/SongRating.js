import { Component } from 'react';
import React from "react";
import apiHelper from "./apiHelper";

class SongRating extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: undefined,
			userValue: this.props.song.ratings ? this.props.song.ratings.currentUserRating : null
		};
		this.value = this.props.song.ratings ? this.props.song.ratings.average : 0;
	}
	onMouseEnter(pos) {
		if (!this.props.changeable)
			return;
		this.setState({
			hover: pos
		});
	}
	onMouseLeave() {
		if (!this.props.changeable)
			return;
		this.setState({
			hover: undefined
		});
	}
	setRating(rating) {
		rating = rating === this.state.userValue ? null : rating;
		apiHelper.rateSong(this.props.song.id, rating)
			.then(() => {
				this.setState({
					userValue: rating
				});
			})
			.catch((err) => {
				// TODO implement properly
				console.log(err);
			});
	}
	render() {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			let classes = "star";
			if (Math.ceil(this.props.value) >= i) {
				if (this.props.value < i) {
					classes += " half";
				} else {
					classes += " full";
				}
			}
			if (this.state.userValue && this.state.userValue >= i) {
				classes += " active";
			}
			if (this.state.hover && this.state.hover >= i) {
				classes += " hover";
			}
			stars.push(<div
				className={classes}
				onMouseEnter={this.onMouseEnter.bind(this, i)}
				onMouseLeave={this.onMouseLeave.bind(this)}
				onClick={this.setRating.bind(this, i)}>
			</div>);
		}
		let classes = "song-rating"+(this.props.changeable ? " changeable" : "");
		return (
			<div className={classes}>{stars}</div>
		);
	}
}

export default SongRating;