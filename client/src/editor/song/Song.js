import Tone from 'tone';
import APIHelper from '../../apiHelper.js'
import Track from './Track.js';
import Block from './Block.js';

class Song {
    // User: opening song, id of song
    constructor(user, id) {
	this.blocks = [];
	this.tracks = [];
	if (!id === undefined) {
	    // Load song
	    
	} else {
	    // Load empty
	    this.name = "cool song";
	    this.user = user || "unknown";
	    this.createDate = (new Date()).toISOString();
	    this.updateDate = this.createDate;
	    
	    this.bpm = 120;
	    
	    this.blocks.push(new Block());
	    this.tracks.push(new Track());
	    this.blockLength = 1;
	}
	
	this.activeBlock = this.blocks[0].block;
	this.key = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3'];
    }

    start() {
	this.synth = new Tone.PolySynth(16, Tone.Synth).toMaster();
	Tone.Transport.loopEnd = this.blockLength + "m";
	Tone.Transport.bpm.value = this.bpm;
	this.count = 0;
	this.loop = new Tone.Loop(() => {
	    for (let i = 0; i < 12; i++) {
		switch(this.activeBlock[i][this.count].type) {
		    case 'on':
			this.synth.triggerAttackRelease(this.key[i], '16n');
			break;
		    case 'start':
			this.synth.triggerAttack(this.key[i]);
			break;
		    case 'end':
			this.synth.triggerRelease(this.key[i]);
			break;
		}
	    }
	    if (this.count >= 15) {
		this.count = 0;
	    } else {
		this.count++;
	    }
	}, '16n').start(0);
    }

    save()
    {
	if(this.id === undefined) {
	    // create new song and get id
	    var id = APIHelper.createSong(this.getSendableSong());
	} else {
	    // update song
	     
	}
    }
    
    getSendableSong()
    {
	var sendableSong = {
	    name: this.name,
	    bpm: this.bpm,
	    blockLength: this.blockLength,
	    instruments: this.tracks.map((track) => {
		return track.track;
	    }),
	    blocks: {}
	};
	for(let i = 0; i < this.blocks.length; i++) {
	    sendableSong.blocks[i + 1] = {
		data: this.blocks[i].convertToData()
	    };
	}
	return sendableSong;
    }
}

export default Song;
