import * as Cookies from 'js-cookie';

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
	    Cookies.set('name', res.name || "unknown");
	    Cookies.set('token', res.token);
	    console.log(res.token);
	    Cookies.set('secret', res.refreshSecret);
	    return "Success";
	}
	return req.response;
    },
};

export default apiHelper;
