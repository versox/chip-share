import React, { Component } from 'react';
import constant from "./constants";

// https://codepen.io/teimurjan/pen/MXGovg
class MenuDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}
	toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
	render() {
		return (
			<li className='dropdown' onClick={this.toggleOpen}>
				<a href='#' className={'nav-link dropdown-toggle'+(window.location.pathname.startsWith(this.props.item.path) ? " active" : "")}>
					{this.props.item.title}
				</a>
				<div className={'dropdown-menu'+(this.state.isOpen ? ' show' : '')}>
					{this.props.item.items.map((listItem) => {
						return <a className="dropdown-item" href={constant.ROOT_PATH+listItem.path}>{listItem.title}</a>
					})}
				</div>
			</li>
		);
	}
}

export default MenuDropdown;