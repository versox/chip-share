import Tone from 'tone';
import Song from './Song.js';

class EditableSong extends Song {
    constructor(songMeta) {
	super(songMeta);
	this.selectedTrack = 0;
    }

    addTrack() {
	
    }

    setName(name) {
	this.name = name;
    }

    setBPM(bpm) {
	this.bpm = bpm;
	Tone.Transport.bpm.value = this.bpm;
    }
}

export default EditableSong;
