import Song from './Song.js';

class EditableSong extends Song {
    constructor(songMeta) {
	super(songMeta);
	this.selectedTrack = 0;
    }

    addTrack() {
	
    }
}

export default EditableSong;
