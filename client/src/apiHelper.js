import * as Cookies from 'js-cookie';
import constant from './constants.js';

const in30Minutes = 1/48;

const getResponse = (xhr) => {
	const contentType = xhr.getResponseHeader("Content-Type");
	if (contentType.includes("application/json")) {
		return JSON.parse(xhr.response);
	} else {
		return xhr.response;
	}
};
const makeApiRequest = (method, route, body = null) => {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, constant.ROOT_PATH + "api/" + route);
		const token = Cookies.get('token');
		if (token)
			xhr.setRequestHeader("Authorization", token);
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr);
			} else {
				reject({
					status: this.status,
					request: xhr
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: this.status,
				request: xhr
			});
		};
		if (body != null && typeof body !== 'undefined') {
			xhr.setRequestHeader("Content-Type", "application/json");
			if (typeof body === 'object')
				body = JSON.stringify(body);
			xhr.send(body);
		} else
			xhr.send();
	});
};
const serializeParams = function(params) {
	let str = "";
	for (const key in params) {
		if (str !== "")
			str += "&";
		str += key + "=" + encodeURIComponent(params[key]);
	}
	return str.length > 0 ? '?'+str : '';
};

const apiHelper = {
	getCaptcha: function() {
		return new Promise(function(resolve, reject) {
			makeApiRequest('GET', 'user/register')
				.then((xhr) => resolve(getResponse(xhr)))
				.catch((err) => reject(err));
		});
	},
	register: function(inputData, captchaKey) {
		const req = new XMLHttpRequest();
		req.open("POST", constant.ROOT_PATH + "api/user/register", false);
		req.setRequestHeader("Content-Type", "application/json");
		if (inputData.captcha) {
			inputData.captcha = {
				answer: inputData.captcha,
				key: captchaKey
			}
		}
		req.send(JSON.stringify(inputData));
		return req;
	},
	login: function(user, pass) {
		const req = new XMLHttpRequest();
		req.open("POST", constant.ROOT_PATH + "api/user/login", false);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(JSON.stringify({
			username: user,
			password: pass
		}));
		if (req.status === 200) {
			var res = JSON.parse(req.response);
			Cookies.set('user', JSON.stringify({name: res.name, username: user.toLowerCase()}) || "unknown", {
				expires: in30Minutes
			});
			Cookies.set('token', res.token, {
				expires: in30Minutes
			});
			Cookies.set('secret', res.refreshSecret, {
				expires: in30Minutes
			});
		}
		return req;
	},
	logout: function() {
		Cookies.remove('user');
		Cookies.remove('token');
		Cookies.remove('secret');
	},
	createSongDirty: function(song) {
		var token = Cookies.get('token');
		if(!(token === undefined)) { // try !(!(!(!(!(!(!(!(token !== undefined)))))))) - alex
			var req = new XMLHttpRequest();
			req.open("POST", constant.ROOT_PATH + "api/songs/create", false);
			req.setRequestHeader("Content-Type", "application/json");
			req.setRequestHeader("Authorization", token);
			req.send(JSON.stringify(song));
			console.log(req.response);
			if (req.status === 200) {
				return req.response.id;
			}
		} else {
			console.log("not logged in!");
		}
	},
	createSong: function(songData) {
		return new Promise((resolve, reject) => {
			makeApiRequest('POST', 'songs/create', songData)
				.then(resolve)
				.catch(reject);
		});
	},
	updateSong: function(id, songData) {
		return new Promise((resolve, reject) => {
			makeApiRequest('POST', 'songs/update/'+id, songData)
				.then(resolve)
				.catch(reject);
		});
	},
	getSongsDirty: function(userId) {
		var req = new XMLHttpRequest();
		var url;
		if(userId === undefined) {
			url = constant.ROOT_PATH + "api/songs";
		} else {
			url = constant.ROOT_PATH + "api/songs/get?userId=" + userId;
		}
		req.open("GET", url, false);
		const token = Cookies.get('token');
		if (token)
			req.setRequestHeader("Authorization", token);
		req.send();
		if (req.status === 200) {
			return JSON.parse(req.response);
		} else {
			return [];
		}
	},
	getSongs: function(userId = null, popular = false, delimiterId = null) {
		const params = {};
		if (userId) params.userId = userId;
		if (popular) params.popular = 1;
		if (delimiterId) params.delimiterId = delimiterId;
		return new Promise(function(resolve, reject) {
			makeApiRequest('GET', 'songs'+serializeParams(params))
				.then((xhr) => resolve(getResponse(xhr)))
				.catch((err) => reject(err));
		});
	},
	getSong: function(id, format = "full") {
		var req = new XMLHttpRequest();
		req.open("GET", constant.ROOT_PATH + "api/songs/" + id + "/" + format, true);
		const token = Cookies.get('token');
		if (token && format === "full")
			req.setRequestHeader("Authorization", token);
		var songPromise = new Promise((resolve, reject) => {
			req.onreadystatechange = () => {
				// Done
				if (req.readyState === 4) {
					// Success
					if (req.status === 200) {
						resolve(req.response);
					} else {
						reject(req.response);
					}
				}
			}
		});
		req.send();
		return songPromise;
	},
	rateSong: function(id, rating = null) {
		return new Promise(function(resolve, reject) {
			makeApiRequest('POST', 'songs/rate/'+id+(rating ? '/'+rating : ''))
				.then(() => resolve(true))
				.catch((err) => reject(err));
		});
	},
	fetchUser: function(username) {
		return new Promise(function(resolve, reject) {
			makeApiRequest('GET', 'user/fetch/'+username)
				.then((xhr) => resolve(getResponse(xhr)))
				.catch((err) => reject(err));
		});
	},
	isLoggedIn: function() {
		return !!Cookies.get('token');
	},
	getCurrentUser: function() {
		if (!Cookies.get('token') || !Cookies.get('user')) return null;
		try {
			return JSON.parse(Cookies.get('user'));
		} catch (e) {
			return null;
		}
	}
};

export default apiHelper;
