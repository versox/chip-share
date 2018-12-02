import Tone from 'tone';
import APIHelper from '../../apiHelper.js'
import Track from './Track.js';
import Block from './Block.js';

class Song {
	// User: opening song, id of song
	constructor(songMeta) {
		this.blocks = [];
		this.tracks = [];
		if (!(songMeta === undefined)) {
			// Song exist: Load meta
			this.name = songMeta.name;
			this.bpm = songMeta.bpm;
			this.blockLength = songMeta.blockLength;

			this.createDate = new Date(songMeta.createDate);
			this.updateDate = songMeta.updateDate ? new Date(songMeta.updateDate) : null;
			this.author = songMeta.user.name;
			this.username = songMeta.user.username;
			this.ratings = songMeta.ratings;

			this.id = songMeta.id;
		} else {
			// Empty meta
			this.name = "awesome song";
			this.bpm = 120;
			this.blockLength = 1;
		}
		this.setKey();
		this.loaded = false;
		this.progressListeners = [];
	}

	setKey(freq, type) {
		this.freq = freq || "C";
		this.keyType = type || "Maj";
		this.key = [];
		this.key[11] = (this.freq + "3");
		var step = (type === "Maj") ?
			[2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2] :
			[2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2];
		for (let i = 10, j = 0; i >= 0; i--, j++) {
			this.key[i] = Tone.Frequency(this.key[i+1]).transpose(step[j]);
		}
		if (this.synth) this.synth.releaseAll();
	}

	load(songMeta) {
		this.blocks.push(null);
		if(this.id === undefined || songMeta === undefined)
		{
			// Load empty song
			this.blocks.push(new Block());
			this.tracks.push(new Track());
		} else {
			// Load song from composition data
			for (let i = 0; i < songMeta.instruments.length; i++) {
				this.tracks.push(new Track(songMeta.instruments[i]));
			}
			for (let i = 1; i <= this.blockLength; i++) {
				let block = new Block(songMeta.blocks[i]);
				this.blocks.push(block);
			}
		}
		this.activeBlock = this.blocks[1].block;
		this.loaded = true;
	}

	init() {
		Tone.Transport.cancel();
		this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
		this.count = 0;
		this.loop = new Tone.Loop((time) => {
			for (let i = 0; i < 12; i++) {
				switch(this.activeBlock[i][this.count].type) {
					case 'on':
						this.synth.triggerAttackRelease(this.key[i], '16n', time);
						break;
					case 'start':
						this.synth.triggerAttack(this.key[i], time);
						break;
					case 'end':
						this.synth.triggerRelease(this.key[i], time);
						break;
				}
			}
			if (this.count >= 15) {
				this.count = 0;
			} else {
				this.count++;
			}
		}, '16n');
	}

	play() {
		if (!this.initialized) {
			this.init();
			this.initialized = true;
		}
		Tone.Transport.loopEnd = this.blockLength + "m";
		Tone.Transport.loop = true;
		Tone.Transport.bpm.value = this.bpm;
		//schedule an event on the 16th measure
		this.progressTickEvent = Tone.Transport.scheduleRepeat(function(time) {
			const pct = Tone.Transport.seconds/Tone.Transport.loopEnd;
			if (pct < 0 || pct > 1)
				return;
			for (const key of this.progressListeners.keys())
				this.progressListeners[key](pct);
			console.log();
		}.bind(this), "8i");
		this.loop.start(0);
		Tone.Transport.start();
		if (this.pauseTime)
			Tone.Transport.seconds = this.pauseTime;
	}

	pause() {
		this.pauseTime = Tone.Transport.seconds;
		this.loop.stop(0);
		Tone.Transport.stop();
		this.synth.releaseAll();
		Tone.Transport.clear(this.progressTickEvent);
	}

	save() {
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
		for(let i = 1; i <= (this.blocks.length - 1); i++) {
			sendableSong.blocks[i] = {
				data: this.blocks[i].convertToData()
			};
		}
		return sendableSong;
	}

	getFormattedCreate() {
		return getFormattedDate(this.createDate);
	}

	getFormattedUpdate() {
		return getFormattedDate(this.updateDate);
	}

	hasBeenUpdated() {
		return this.updateDate && Math.abs(this.createDate - this.updateDate) >= 50;
	}
	addProgressListener(context, listener) {
		this.progressListeners.push(listener.bind(context));
	}
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
	return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

export default Song;
