#REST API Documentation
##Basic Concepts
* JSON Web Tokens are used for user authorization. Upon successful login, a token is given that needs to be included in a `Authorization` header for every applicable request.
* For generic errors, the response body contains a JSON object with two fields:
  * `errorCode`: the numeric HTTP error code, same one as returned with the response itself.
  * `message`: a message describing the error.
##Users API
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

### `POST /api/user/login`
Login request. Specify a JSON payload with `username` and `password` fields.
If login unsuccessful, returns `401 Unauthorized` status code:
```$xslt
{
    "errorCode": 401,
    "message": "invalid username or password"
}
```
Otherwise, returns `200 OK` with the authorization token to use for the user:
```$xslt
{
    "token": "Bearer LONG_TOKEN_HERE..."
}
```
Save this token value into a cookie and specify it in the `Authorization` header for subsequent requests.
**To logout**, simply discard the token.
### `POST /api/user/delete-account`
**The `Authorization` header with the user token is needed for this request.**
Deletes the account associated with the token. Returns `200 OK` on successful deletion.
The auth token should be discarded after this request.