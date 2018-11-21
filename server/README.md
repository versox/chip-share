# REST API Documentation
## Basic Concepts
* JSON Web Tokens are used for user authorization. Upon successful login, an access token is given that needs to be included in a `Authorization` header for every applicable request.
* Access tokens **last for 30 minutes** from the moment issued. A token can be "refreshed" within this time limit using the `refreshSecret` given in the login response (more on this below).
* Requests to protected resources with a missing/invalid access token will result in a `401 Unauthorized` response status code.
* For generic errors, the response body contains a JSON object with two fields:
  * `errorCode`: the numeric HTTP error code, same one as returned with the response itself.
  * `message`: a message describing the error.
## Users API
### `GET /api/user/register`
Returns a captcha for registration.<br>
Sample response:
```json
{
    "captcha": {
        "image": "<svg>...</svg>",
        "key": "..."
    }
}
```
The `image` field contains a SVG-image to be displayed.
The captcha `key` is valid for 5 minutes, and must be sent with the captcha answer in the next request.
<br>
<br>
### `POST /api/user/register`
Creates a new user based on the JSON payload. Example payload:
```json
{
	"name": "John Smith",
	"username": "johnsmith",
	"password": "password",
	"captcha": {
		"answer": "...",
		"key": "..."
	}
}
```
You must provide the captcha `answer` (specified by user input) and captcha `key`.
If there were any errors in the registration, `400 Bad Request` status code is returned. The response body also contain all the field errors and a possible captcha error, e.g.:
```
{
    "fieldErrors": {
        "username": "Username already taken."
    },
    "captchaError": "Captcha has expired."
}
```
The `captchaError` field will only be present if the captcha validation failed for any reason, including but no limited to an incorrect answer.
If the registration succeeds, a `201 Created` status code is returned with no body.
<br>
<br>
### `POST /api/user/login`
Login request. Specify a JSON payload with `username` and `password` fields.
If login unsuccessful, returns `401 Unauthorized` status code:
```json
{
    "errorCode": 401,
    "message": "invalid username or password"
}
```
Otherwise, returns `200 OK` with the name of the user associated with the account, an access token, and refresh-secret:
```json
{
	"name": "...",
    "token": "...",
    "refreshSecret": "..."
}
```
Save the token and refresh-secret into separate cookies. Also store the expiry of the token, which is 30 minutes past issue.<br>
The **refresh-secret** is used to generate a new token using the token it was returned with (next section).<br>
**To logout**, simply discard the token.
<br>
<br>
### `POST /api/user/refresh-access`
_Access token needed for this request._<br>
Request for a new, refreshed access token, using a token that **is not yet expired**.<br>
The payload must contain the refresh-secret given with the access token, as such:
```json
{
    "refreshSecret": "..."
}
```
If the request is valid, returns `200 OK` with a new token and refresh-secret:
```json
{
    "token": "...",
    "refreshSecret": "..."
}
```
For security purposes, it's best to request a refreshed token only a few minutes prior to the expiry of the original token.
<br>
<br>
### `POST /api/user/delete-account`
_Access token needed for this request._<br>
Deletes the account associated with the token. Returns `200 OK` on successful deletion.
The auth token should be discarded after this request.

## Song API
### Notes
* Songs contain the following properties:
  * `name`: Name of the song, 0-200 characters.
  * `user`: Set automatically; the full user object of the song's artist.
  * `blockLength`: The block-length of the song, 1-8.
  * `bpm`: Integer, 1-500.
  * `blocks`: A mapping of ids to blocks. _More on this below_.
  * `instruments`: An array of instruments. _More on this below_.
  * `ratings`: An object containing the following fields:
    * `average`: The average rating for song, a double from 1-5 inclusive, rounding the average to _.5_ of a star.
    * `total`: The total amount of ratings.
    * `currentUserRating`: The star rating of the currently logged in user (only present if **access token is provided** and the user rated the song).
  * `createDate`: Formatted to ISO 8601.
  * `updateDate`: Formatted to ISO 8601.
* Actual song music data is composed of blocks and instruments.
* A block defines a collection of notes, in a 2d-array fashion:
  * The outer array contains 12 arrays, each for a separate pitch.
  * Each inner array contains 16 integers as notes.
  * Each note is a 4-bit unsigned integer (0-15) representing the state of the note.
  * Each block must have a **unique integer id, ranging from 1-32**.
  * The blocks property of each song is a **mapping of ids to objects**, which contain a single `data` field for the 2d-array.
  * There **cannot be more than 32 blocks** per song.
* An instrument contains various settings, and an array of block ids.
  * The settings object contains a `typeId` (single digit), and a `metadata` string composed of 3 integers followed by 2 characters (aka the instrument _profile_).
  * The block id array **must have the same length as `blockLength`** of the song!
  * The instruments property of each song is **an array**.
  * There **cannot be more than 4 instruments** per song.


### `GET /api/songs/[<songId>/<format>]`
If optional parameters `songId` and `format` are **not** specified, returns an array of all songs, including all properties **except blocks and instruments**.
To fetch the **composition** of a song (the blocks and instruments data), specify the optional parameters (explained below).<br>
Example response:
```json
[
    {
        "name": "Renamed Song",
        "bpm": 1,
        "blockLength": 8,
        "createDate": "2018-11-14T03:15:38.881Z",
        "updateDate": "2018-11-14T03:33:57.628Z",
        "user": {
            "name": "John Smith",
            "username": "johnsmith",
            "id": "5be0ecb6c14fa64be84a7611"
        },
        "id": "5beb935a70f5a113b818a9ad"
    },
    {
        "name": "Another Song",
        "bpm": 1,
        "blockLength": 8,
        "createDate": "2018-11-14T04:26:56.072Z",
        "updateDate": null,
        "user": {
            "name": "John Smith",
            "username": "johnsmith",
            "id": "5be0ecb6c14fa64be84a7611"
        },
        "id": "5beba410050a434fd42c421e"
    }
]
```
To get an array of songs from **one individual user** (by id), specify the user's id with the `?userId=...` query (e.g. `/api/songs/get?userId=5be0ecb6c14fa64be84a7611`).
<br>
<br>
You can fetch an individual song with the `songId` and `format` parameters (both must be provided).
The format parameter can either equal `composition` or `full`:
* `composition`: Only returns the block and instrument data of the song.
* `full`: Returns everything about the song.

If the format parameter is anything else, or not specified, you'll get an error.
#### Why have it like this, you ask?
When fetching a list of songs, the actual user may not want to play every single one of them. With the `composition` format request, you can grab the actual music data once the user presses play.
<br>
Example response for `GET /api/songs/5beb935a70f5a113b818a9ad/composition`:
```json
{
    "instruments": [
        {
            "blocks": [
                1,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "settings": {
                "typeId": 1,
                "metadata": "123ab"
            }
        }
    ],
    "blocks": {
        "1": {
            "data": [
            	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            	[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            	[0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
            	[0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
            	[0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0],
            	[0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0],
            	[0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0],
            	[0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0],
            	[0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0],
            	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            	[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
            	[1,1,1,0,0,0,0,0,0,0,0,2,0,0,0,0]
            ]
        }
    },
    "id": "5beb935a70f5a113b818a9ad"
}
```
A `full` format request would have the above data, along with all other basic properties of the song.
<br>
<br>
### `POST /api/songs/create`
_Access token needed for this request._<br>
Request to create a song. The payload must be of the exact same format as shown in the above responses.<br>
Example payload:
```json
{
	"name": "Song Title",
	"bpm": 123,
	"blockLength": 4,
	"instruments": [{
		"settings": {
			"typeId": 1,
			"metadata": "123ab"
		},
		"blocks": [1, null, null, null]
	}],
	"blocks": {
		"1": {
			"data": [
				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0]
			]
		}
	}
}
```
Upon invalid input, you'll get a map of field errors, such as the following example:
```json
{
	"fieldErrors": {
		"bpm": "Path `bpm` (0) is less than minimum allowed value (1).",
		"blocks": "Block ids must range from 1-32, inclusive.",
		"instruments.0.blocks": "There must be 8 total block ids per instrument (use null for empty blocks).",
		"instruments.0.settings.metadata": "Metadata must be a string consisting of 3 integers followed by 2 characters.",
		"instruments.0.settings": "Validation failed: metadata: Metadata must be a string consisting of 3 integers followed by 2 characters."
	}
}
```
If the song is created successfully, you'll get a `200 OK` response code, with the id of the new song:
```json
{
	"id": "5beb935a70f5a113b818a9ad"
}
```


### `POST /api/songs/update/<songId>`
_Access token needed for this request._<br>
Same payload as for create request, but only need to include the properties to be updated.
Same `fieldErrors` mapping given for invalid input.
Upon successful update, returns `200 OK` with no body.
<br>
<br>
### `POST /api/songs/delete/<songId>`
_Access token needed for this request._<br>
Self-explanatory purpose. Returns `200 OK` upon successful deletion.
<br>
<br>
### `POST /api/songs/rate/<songId>/[rating]`
_Access token needed for this request._<br>
Request to rate a song by id.
If optional `rating` parameter is present, and is a valid integer from 1-5 inclusive, sets that as the rating of the user.
If the `rating` parameter is omitted, resets/removes the rating of the user.<br>
Returns `200 OK` unless the rating is an invalid integer, or if an unknown error occurred.