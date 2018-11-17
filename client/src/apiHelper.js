import * as Cookies from 'js-cookie';

const in30Minutes = 1/48;

var apiHelper =
{
    register: function(name, user, pass) {
	var req = new XMLHttpRequest();
	req.open("POST", "/api/user/register", false);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify({
	    name: name,
	    username: user,
	    password: pass
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
	console.log(token);
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
    }
};

export default apiHelper;
