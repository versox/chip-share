import React, { Component } from 'react';
import Editor from './editor/Editor.js';
import Home from './Home.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.pages = [
	   <Home />, <Editor />
    ];
    this.state = {
	    activePage: 0
    }
  }

  SetActiveHome () {
    this.setState(state => ({
      activePage: 0
    }));
  }

  SetActiveCreate () {
    this.setState(state => ({
      activePage: 1
    }));
  }

  render() {
    return (
      <div className="App">
	    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	          <div class="container">
	            <a class="navbar-brand" href="#" onClick={this.SetActiveHome.bind(this)}>Chip Share</a>
	            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	              <span class="navbar-toggler-icon"></span>
	            </button>
	            <div class="collapse navbar-collapse" id="navbarResponsive">
	              <ul class="navbar-nav ml-auto">
	                <li class="nav-item active">
	                  <a class="nav-link" href="#" onClick={this.SetActiveHome.bind(this)}>Home
	                    <span class="sr-only">(current)</span>
	                  </a>
	                </li>
	                <li class="nav-item">
	                  <a class="nav-link" href="#" onClick={this.SetActiveCreate.bind(this)}>Create</a>
	                </li>
	                <li class="nav-item">
	                  <a class="nav-link" href="#">My Songs</a>
	                </li>
	                <li class="nav-item">
	                  <a class="nav-link" href="#">Community</a>
	                </li>
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
