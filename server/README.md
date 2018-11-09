# REST API Documentation
## Basic Concepts
* JSON Web Tokens are used for user authorization. Upon successful login, an access token is given that needs to be included in a `Authorization` header for every applicable request.
* Access tokens **last for 30 minutes** from the moment issued. A token can be "refreshed" within this time limit using the `refreshSecret` given in the login response (more on this below).
* Requests to protected resources with a missing/invalid access token will result in a `401 Unauthorized` response status code.
* For generic errors, the response body contains a JSON object with two fields:
  * `errorCode`: the numeric HTTP error code, same one as returned with the response itself.
  * `message`: a message describing the error.
## Users API
### `POST /api/user/register`
Creates a new user based on the JSON payload. Example payload:
```
{
	"name": "John Smith",
	"username": "johnsmith",
	"password": "password"
}
```
If there were any errors in the registration, `400 Bad Request` status code is returned. The response body also contain all the field errors, e.g.:
```
{
    "fieldErrors": {
        "username": "Username already taken."
    }
}
```
If the registration succeeds, a `201 Created` status code is returned with no body.
<br>
<br>
### `POST /api/user/login`
Login request. Specify a JSON payload with `username` and `password` fields.
If login unsuccessful, returns `401 Unauthorized` status code:
```$xslt
{
    "errorCode": 401,
    "message": "invalid username or password"
}
```
Otherwise, returns `200 OK` with the access token and refresh-secret to use for the user:
```$xslt
{
    "token": "Bearer LONG_TOKEN_HERE...",
    "refreshSecret": "SECRET_STRING"
}
```
Save the token and refresh-secret into separate cookies. Potentially also store the expiry of the token, which is 30 minutes past issue.<br>
The **refresh-secret** is used to generate a new token using the token it was returned with (next section).<br>
**To logout**, simply discard the token.
<br>
<br>
### `POST /api/user/refresh-access`
_Access token needed for this request._<br>
Request for a new, refreshed access token, using a token that **is not yet expired**.<br>
The payload must contain the refresh-secret given with the access token, as such:
```$xslt
{
    "refreshSecret": "SECRET_STRING"
}
```
If the request is valid, returns `200 OK` with a new token and refresh-secret:
```$xslt
{
    "token": "Bearer LONG_TOKEN_HERE...",
    "refreshSecret": "SECRET_STRING"
}
```
For security purposes, it's best to request a refreshed token only a few minutes prior to the expiry of the original token.
<br>
<br>
### `POST /api/user/delete-account`
_Access token needed for this request._<br>
Deletes the account associated with the token. Returns `200 OK` on successful deletion.
The auth token should be discarded after this request.