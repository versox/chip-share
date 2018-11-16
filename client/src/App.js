import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as Cookies from 'js-cookie';
import Editor from './editor/Editor.js';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Profile from './Profile.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.itemNames = [
	"Create", "My Songs", "Community"
    ];
    this.destination = [
	"editor", "profile", ""
    ];
  }

  setActive(index) {
      this.setState({
	activePage: index
      });
      Cookies.set('actPage', index, { expires: 1 });
  }

  render() {
    var navBarItems = this.itemNames.map((name, index) => {
	return <li className="nav-item" key={index}>
	    <a href={this.destination[index]} className={"nav-link " + (false ? "active" : "")}>
		{this.itemNames[index]}
	    </a>
	</li>;
    });
    return (
      <div className="App">
	    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	          <div className="container">
	            <a className="navbar-brand" href="/">Chip Share</a>
	            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	              <span className="navbar-toggler-icon"></span>
	            </button>
	            <div className="collapse navbar-collapse" id="navbarResponsive">
	              <ul className="navbar-nav mr-auto">
			{navBarItems}
	              </ul>
	    	      <ul className="navbar-nav ml-auto">
	    		<a class="nav-link" href="/login">Log In / Register</a>
	    	        <li class="nav-item dropdown">
	                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                  Logged in as: Test User
	                  </a>
	                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
	                    <a class="dropdown-item" href="#">Profile</a>
	                    <a class="dropdown-item" href="#">Options</a>
	                    <div class="dropdown-divider"></div>
	                    <a class="dropdown-item" href="#">Log Out</a>
	                  </div>
	                </li>
	              </ul>
	            </div>
	          </div>
	    </nav>
	    <Router>
		<div>
		    <Route path="/" exact component={Home} />
		    <Route path="/editor" component={Editor} />
		    <Route path="/login" component={Login} />
		    <Route path="/register" component={Register} />
	    	    <Route path="/profile" component={Profile} />
		</div>
	    </Router>
      </div>
    );
  }
}

export default App;
