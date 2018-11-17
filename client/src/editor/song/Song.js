import Tone from 'tone';
import APIHelper from '../../apiHelper.js'
import Track from './Track.js';
import Block from './Block.js';

class Song {
    // User: opening song, id of song
    constructor(openingUsername, songMeta) {
	this.blocks = [];
	this.tracks = [];
	console.log("New song:");
	console.log(songMeta);
	if (!(songMeta === undefined)) {
	    // Load meta
	    this.name = songMeta.name;
	    this.bpm = songMeta.bpm;
	    this.blockLength = songMeta.blockLength;

	    this.createDate = new Date(songMeta.createDate);
	    this.updateDate = new Date(songMeta.updateDate);
	    this.author = songMeta.user.name;
	    this.username = songMeta.user.username;

	    this.id = songMeta.id;
	} else {
	    // Empty meta
	    this.name = "awesome song";
	    this.bpm = 120;
	    this.blockLength = 1;
	}
	this.key = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'G3', 'F3'];
    }

    getFormattedCreate() {
	return getFormattedDate(this.createDate);
    }

    getFormattedUpdate() {
	return getFormattedDate(this.updateDate);
    }

    hasBeenUpdated() {
	return (!(Math.abs(this.createDate - this.updateDate) < 50));
    }


    load() {
	if(this.id === undefined)
	{
	    this.blocks.push(new Block());
	    this.tracks.push(new Track()); 
	}
	this.activeBlock = this.blocks[0].block;
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


function getFormattedDate(date) {
    var currentDate = new Date();
    // same day
    if(currentDate.getDate() === date.getDate()
       && currentDate.getMonth() === date.getMonth()
       && currentDate.getFullYear() === date.getFullYear())
    {
	let totMin = Math.floor((currentDate - date) / 60000);
	let hours = Math.floor(totMin / 60);
	let minutes = totMin % 60;
	let hourString = "hour";
	if(hours > 1) hourString += "s";
	if(minutes === 0)
	{
	    return hours + " " + hourString + "  ago";
	}
	let minuteString = "minute";
	if(minutes > 1) minuteString += "s";
	if(hours === 0)
	{
	    return minutes + " " + minuteString + " ago";
	}
	return hours + " " + hourString + " and " + minutes + " " + minuteString + " ago";
    }

    return date.getMonth() + " " + date.getDate() + ", " + date.getFullYear();
}

export default Song;
