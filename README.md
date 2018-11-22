# chip-share

![gitShareFirstLook](chipShareFirstLook.png)

Remaining Tasks:
---------
**Only 2 weeks left!**

* Server.
  * ~~Song ratings API.~~
  * Song ranking (post time & ratings factored).
  * Sequential fetching of songs (load more).
  * Add song colors enum.
  * Add ability to update names/passwords.
* Client.
  * Homepage.
    * Ability to play/pause songs.
    * Loading more songs.
    * Remove "favorites" tab (not really supported by API).
  * Song editor.
    * Style
    * Fix quirks.
      * Note range overlapping.
      * Removing note ranges.
      * Dragging across lines prevents creating range until click.
	  * Pausing at precise times can cause note (range?) to play infinitely.
      * Songs keep playing when switching to editor.
  * Song list.
    * ~~Add rating stars.~~
  * Login page.
    * Display field error messages.
  * Registration page.
    * Display field error messages.
    * Captcha implementation.
  * Profile page.
    * For now, just song listing (remember to use grid system) with user's name/username at the top.
  * User settings page.
    * Ability to update name/password.
  * The 6 required assignment pages.
  * Build everything to static files for production.

---


Week One:
---------

Alex: (Server) accounts, login, signup, cookies?

Carson: (Client) chiptune editor

Jake: prototype designs for main page / song listing

Mishel: prototype designs with Jake

Week Two:
---------
||Roles|
|-|-|
|**Alex**|Create full song API (storing/retrieving songs, binary storage server format <-> JSON client format, CRUD requests).|
|**Carson**|Create/prepare individual components for website (song block, rating stars, editor, etc).<br>Start implementation of users API.|
|**Jake**|Switch to external styling only.<br>Switch to Bootstrap v4.<br>Maybe find a free (v4) theme to speed up the design process.<br>Work on overall styling & page responsiveness.|
|**Mishel**|Create a logo for Chip Share (if you can).<br>Markup for required page 1 & 2 of assignment (placeholder content, that we can fill in later, use bootstrap).|
	