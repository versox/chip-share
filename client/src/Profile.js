import React, { Component } from 'react';

class Profile extends Component {
    render() {
	return (
	    <div>
	      <h1 class="account-name">Account Name</h1>
	      <div class="container">
		<div class="row">
	          <div class="col">
	            <div class="msec">
		      <h3>My Songs</h3>
		      <hr></hr>
		      <button class="btn btn-light" href="#">Create a New Song</button>
		    </div>
	          </div>
		  <div class="col">
		    <div class="msec">
		      <h3>Favourite Songs</h3>
		      <hr></hr>
		    </div>
		  </div>
		</div>
	      </div>
	    </div>
	);
    }
}

export default Profile;
