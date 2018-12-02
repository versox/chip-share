import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Editor from './editor/Editor.js';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Profile from './Profile.js';
import constant from './constants.js';
import FrameworksPage from "./assignment_pages/FrameworksPage";
import TutorialPage from "./assignment_pages/TutorialPage";
import TopSongs from './assignment_pages/TopSongs.js';
import ConclusionPage from "./assignment_pages/ConclusionPage";
import InstallationPage from "./assignment_pages/InstallationPage";
import CreditsPage from "./assignment_pages/CreditsPage";
import MenuDropdown from "./MenuDropdown";
import APIHelper from './apiHelper';
import Logout from "./Logout";

class App extends Component {

	constructor(props) {
		super(props);
		this.user = APIHelper.getCurrentUser();
		this.menu = [
			{ title: "Create", path: "editor/new" },
			{ title: "My Songs", path: "profile/"+(this.user ? this.user.username : ''), userOnly: true },
			{ title: "Assignment", path: "assignment", items: [
					{ title: "Frameworks", path: "assignment/frameworks" },
					{ title: "Installation", path: "assignment/installation" },
					{ title: "Tutorial", path: "assignment/tutorial" },
					{ title: "Conclusion", path: "assignment/conclusion" }
				] },
			{ title: "Credits", path: "credits" }
		]
	}

	render() {
		let navBarItems = this.menu.map((menuItem) => {
			if (menuItem.userOnly && !this.user)
				return;
			if (menuItem.path)
				menuItem.path = constant.ROOT_PATH+menuItem.path;
		    return menuItem.items ? <MenuDropdown item={menuItem} /> : <li className={'nav-item'+(menuItem.items ? ' dropdown' : '')}>
			    <a href={menuItem.path || '#'} className={"nav-link "+(window.location.pathname === menuItem.path ? "active" : "")}>
				    {menuItem.title}
			    </a>
		    </li>;
		});
		const UserMenu = () => {
		    const user = APIHelper.getCurrentUser();
		    return <ul className="navbar-nav ml-auto">
			{!user ?
			(<a className="nav-link" href={constant.ROOT_PATH + "login"}>Log In / Register</a>)
			    :
			(<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Logged in as: {user.name}
				</a>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<a className="dropdown-item" href={constant.ROOT_PATH + "logout"}>Log Out</a>
				</div>
			</li>)}
			</ul>;
		};
		return (
			<div className="App">
				<Router basename={constant.ROOT_PATH}>
				    <div>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
							<div className="container">
								<a className="navbar-brand" href={constant.ROOT_PATH}>Chip Share</a>
								<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse" id="navbarResponsive">
									<ul className="navbar-nav mr-auto">
										{navBarItems}
									</ul>
									<Route path="/" component={UserMenu} />
								</div>
							</div>
						</nav>
						<Route path="/" exact component={Home} />
						<Route path="/editor" component={Editor} />
						<Route path="/editor/:id" component={Editor} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/profile/:username?" component={Profile} />
					    <Route path="/assignment/frameworks" component={FrameworksPage} />
					    <Route path="/assignment/installation" component={InstallationPage} />
					    <Route path="/assignment/tutorial" component={TutorialPage} />
					    <Route path="/assignment/topsongs" component={TopSongs} />
					    <Route path="/assignment/conclusion" component={ConclusionPage} />
					    <Route path="/credits" component={CreditsPage} />
					    <Route path="/logout" component={Logout} />
				    </div>
				</Router>
			</div>
		);
	}
}

export default App;
