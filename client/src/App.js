import React, { Component } from 'react';
import Editor from './editor/Editor.js';
import Home from './Home.js';

class App extends Component {
  render() {
    return (
      <div className="App">
	    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
	          <div class="container">
	            <a class="navbar-brand" href="#">Chip Share</a>
	            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	              <span class="navbar-toggler-icon"></span>
	            </button>
	            <div class="collapse navbar-collapse" id="navbarResponsive">
	              <ul class="navbar-nav ml-auto">
	                <li class="nav-item active">
	                  <a class="nav-link" href="#">Home
	                    <span class="sr-only">(current)</span>
	                  </a>
	                </li>
	                <li class="nav-item">
	                  <a class="nav-link" href="#">Create</a>
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
	    <Home />
      </div>
    );
  }
}

export default App;
