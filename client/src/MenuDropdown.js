import React, { Component } from 'react';
import constant from "./constants";

class MenuDropdown extends Component {
	render() {
		return (
			<li className='dropdown' onClick={this.toggleOpen}>
				<a href='#' className={'nav-link dropdown-toggle'} data-toggle="dropdown">
					{this.props.item.title}
				</a>
				<div className={'dropdown-menu'}>
					{this.props.item.items.map((listItem) => {
						return <a className="dropdown-item" href={constant.ROOT_PATH+listItem.path}>{listItem.title}</a>
					})}
				</div>
			</li>
		);
	}
}

export default MenuDropdown;