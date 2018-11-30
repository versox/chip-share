import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import APIHelper from "./apiHelper";
import constants from "./constants";

class Logout extends Component {
	render() {
		APIHelper.logout();
		return <Redirect to={constants.ROOT_PATH} />
	}
}

export default Logout;