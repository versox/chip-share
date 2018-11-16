import React, { Component } from 'react';
import * as Cookies from 'js-cookie';
import Editor from './editor/Editor.js';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';

class App extends Component {

  constructor(props) {
    super(props);
    var page = Cookies.get('actPage');
    if(!page)
    {
	page = 0;
    }
    this.state = {
	    activePage: page
    }
    this.pages = [
	   <Home />, <Editor />, <Login />, <Register />
    ];
    this.itemNames = [
	   "Create", "My Songs", "Community"
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
	    <a href="#top" className={"nav-link " + (this.state.activePage === (index+1) ? "active" : "")}
	       onClick={() => this.setActive(index+1)}>{name}
	    </a>
	</li>;
    });
    return (
      <div className="App">
	    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	          <div className="container">
	            <a className="navbar-brand" href="#top" onClick={() => this.setActive(0)}>Chip Share</a>
	            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	              <span className="navbar-toggler-icon"></span>
	            </button>
	            <div className="collapse navbar-collapse" id="navbarResponsive">
	              <ul className="navbar-nav ml-auto">
			{navBarItems}
	              </ul>
	            </div>
	          </div>
	    </nav>
	    {this.pages[this.state.activePage]}
      </div>
    );
  }
}

export default App;
