import * as Cookies from 'js-cookie';

const in30Minutes = 1/48;

var apiHelper =
{
    registerCaptcha: function() {
	var req = new XMLHttpRequest();
	req.open("GET", "/api/user/register", true);
	var captchaPromise = new Promise((resolve, reject) => {
	    req.onreadystatechange = () => {
		// Done
		if (req.readyState === 4) {
		    if (req.status === 200) {
			resolve(req.response);
		    } else {
			reject(req.response);
		    }
		}
	    };
	});
	req.send();
	return captchaPromise;
    },
    register: function(name, user, pass, captcha) {
	console.log(captcha);
	var req = new XMLHttpRequest();
	req.open("POST", "/api/user/register", false);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify({
	    name: name,
	    username: user,
	    password: pass,
	    captcha: captcha
	}));
	if (req.status === 201)
	{
	    return "Success";
	}
	return req.response;
    },
    login: function(user, pass) {
	var req = new XMLHttpRequest();
	req.open("POST", "/api/user/login", false);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify({
	    username: user,
	    password: pass
	}));
	if (req.status === 200)
	{
	    var res = JSON.parse(req.response);
	    Cookies.set('name', res.name || "unknown", {
		expires: in30Minutes
	    });
	    Cookies.set('token', res.token, {
		expires: in30Minutes
	    });
	    Cookies.set('secret', res.refreshSecret, {
		expires: in30Minutes
	    });
	    return "Success";
	}
	return req.response;
    },
    createSong: function(song) {
	var token = Cookies.get('token');
	if(!(token === undefined)) {
	    var req = new XMLHttpRequest();
	    req.open("POST", "/api/songs/create", false);
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
    getSongs: function(userId) {
	var req = new XMLHttpRequest();
	var url;
	if(userId === undefined) {    
	    url = "/api/songs";
	} else {
	    url = "/api/songs/get?userId=" + userId;
	}
	req.open("GET", url, false);
	req.send();
	return (JSON.parse(req.response));
    },
    getSong: function(id, type) {
	var req = new XMLHttpRequest();
	type = type || "/full";
	req.open("GET", "/api/songs/" + id + type, true);
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
    }
};

export default apiHelper;
