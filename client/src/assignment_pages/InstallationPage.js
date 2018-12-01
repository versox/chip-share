import React, { Component } from 'react';

class InstallationPage extends Component {
	render() {
		return (
			<div className="container" style={{margin: '30px auto 50px'}}>
				<div className="row">
					<div className="col-12">
						<h1>Installing the Frameworks</h1>
						<br />
						<h2>React</h2>
						<h4>Node.js and npm</h4>
						<hr />
						<p class="ao">
						<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-white.png" alt="Node.js" class="right-float" />
						Node.js is a free, open source <b>server environment</b> that can run JavaScript code on various operating systems. Since React is a JavaScript framework, its installation is required for server code execution. Node.js can create dynamic page content, modify files on a server, collect form data and modify data in your database.
						</p>
						<p>
						On <b>Windows or Mac</b>, you can access the <a href="https://nodejs.org/en/download/" target="_blank">Node.js download page</a> and download the correct version of Node.js for your computer.
						</p>
						<p>
						On <b>Linux</b> operating systems, first install a tool called curl if it is not already installed by typing:<br /><code>sudo apt-get install curl</code><br />then use curl to add Node.js to your repository list:<br /><code>curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -</code><br />Finally install Node.js by typing:<br /><code>sudo apt-get install -y nodejs</code>
						</p>
						<p>
						Installing Node.js will also install npm, a <b>Software Registry</b> that installs code packages such as React.
						<br /><br />
						</p>
						<h4>Creating a React App</h4>
						<hr />
						<p>
						The easiest way to install React is by using  a command called <b>create-react-app</b>. Open a command prompt, and install create-react-app with npm by typing:<br /><code>npx create-react-app <b>my-app</b></code><br />In which you may <b>replace my-app with your app name</b>. This will create a project folder containing the required React files. You may then start your local server by typing:<br /><code>npm start</code>
						</p>
						<p>
						A webpage should open at the default port 3000. if it does not open, open a web browser and go to the url <b>localhost:3000</b>, or replace the number with the port number used to run the local server. The default webpage looks like this: 
						</p>
						<img src="/assets/Installation1.png" alt="React Default Page" class="ins-img"/>
						<p>
						<br />Congratulations! You have now created a dynamic webpage and hosted it on a local server. You may now edit the App.js template to turn your site into anything you want. 
						You can find the React docs <a href="https://reactjs.org/docs/getting-started.html" target="_blank">here</a> to learn how to use every tool at your disposal in order to create a dynamic webpage using the framework.
						</p>
						<br />
						<h2>Express</h2>
						<img src="https://miro.medium.com/max/902/1*alZcSIb0lcN7gQIx2tJ_tg.png" alt="Express.js" class="right-float" />
						<p>
						Express is a fast, popular back-end framework for Node.js, so like React, Express requires you to install Node.js first (See: <b>React > Node.js and npm</b>).
						</p>
						<p>
						The installation process for Express is fast and easy. You must first change to your <b>project directory</b>, and run:<br /><code>npm init</code><br /> 
						The command will prompt the user to enter a number of fields, fill these out appropriately or you may also leave them blank for now by pressing the <b>return</b> key.
						To install Express and <b>save it in the dependencies list</b>, type:<br /><code>install express --save</code><br />If you would not like to add it to the dependencies list, type:
						<br /><code>install express --no-save</code><br />
						</p>
						<p>
						And after those two simple steps, Express is already installed to your project directory. The API for express can be found   
						<a href="https://expressjs.com/en/4x/api.html" target="_blank"> here</a> to help you get started with your server-side features for your project.
						</p>
						<br />
						<hr />
						<a href="/assignment/tutorial" className="btn btn-lg btn-primary">Continue to Tutorial</a>
					</div>
				</div>
			</div>
		);
	}
}

export default InstallationPage;
