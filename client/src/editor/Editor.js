import React, { Component } from 'react';
import './editor.css';
import './awesome.css';
import APIHelper from '../apiHelper.js';
import EditableSong from './song/EditableSong.js';
import InstrEdit from './InstrEdit.js';
import BlockEdit from './blockEdit/BlockEdit.js';
import Time from './time/Time.js';

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			error: false,
			name: "",
			bpm: 120,
			key: "",
			keyType: ""
		};
		this.keysArray = ["C", "D", "E", "F", "G", "A", "B"];
		this.keyOptions = this.keysArray.map((key) => {
			return (<option>{key}</option>);
		});
		this.ready = false;
		this.songId = props.match.params.id;
		if (this.songId === "new") {
			this.song = new EditableSong();
			this.song.load();
			this.song.init();
			this.ready = true;
		} else if (!(this.songId === undefined)) {
			APIHelper.getSong(this.songId)
				.then((res) => {
					return JSON.parse(res);
				})
				.then((parsed) => {
					this.song = new EditableSong(parsed);
					this.song.load(parsed);
					this.song.init();
					this.ready = true;
					this.setState({
						name: this.song.name,
						bpm: this.song.bpm,
						key: this.song.freq,
						keyType: this.song.keyType
					});
					this.forceUpdate();
				})
				.catch((err) => {
					this.state.error = true;
					this.state.errComp = <h1> Could not load song: {err} </h1>;
				});
		}
	}

	componentDidMount() {
		if(false && this.song && !this.ready)
		{
			this.song.load(this.songMeta);
			this.song.init();
			this.ready = true;
			this.forceUpdate();
		}
	}

	scheduleButtonReset() {
		if (this.notificationTask)
			clearTimeout(this.notificationTask);
		this.notificationTask = setTimeout(() => this.setState({saveBtn: null}), 2000);
	}
	componentWillUnmount() {
		if (this.notificationTask)
			clearTimeout(this.notificationTask);
	}

	handleToggle() {
		this.setState(state => ({
			playing: !state.playing
		}));
		if(this.state.playing) {
			this.song.pause();
		}
		else {
			this.song.play();
		}
	}

	onSave(evt) {
		evt.preventDefault();
		if (!this.name || this.name === '') {
			this.setState({
				saveBtn: 3
			});
			this.scheduleButtonReset();
			return;
		}
		this.setState({
			saveBtn: 1
		});
		this.song.save().then(() => {
			this.setState({
				saveBtn: 2
			});
			this.scheduleButtonReset();
		}).catch(() => {
			this.setState({
				saveBtn: 3
			});
			this.scheduleButtonReset();
		});
	}

	onChange(evt) {
		let newState = {};
		let val = evt.target.value;
		switch (evt.target.id) {
			case "name":
				this.song.setName(val);
				break;
			case "bpm":
				if (val !== "") {
					if (val < 1) {
						val = 1;
					} else if (val > 500) {
						val = 500;
					}
					this.song.setBPM(val);
				}
				break;
			case "keyType":
				this.song.setKey(this.state.key, val);
				break;
			case "key":
				this.song.setKey(val, this.state.keyType);
		}
		newState[evt.target.id] = val;
		this.setState(newState);
	}

	render() {
		if(this.state.error) {
			return this.state.errComp;
		}
		if(!this.song || !this.ready) {
			return ( <div> </div> );
		}

		return (
			<div className="container" style={{'margin-top': '40px'}}>
				{!APIHelper.isLoggedIn() &&
				<div className="alert alert-danger" role="alert">
					You are not logged in, saving songs will not be possible! If you plan on making something awesome, login first!
				</div>
				}
				<div className="editor">
					<div className="editor-header">
					    <span className="header-left">
						    <i onClick={this.handleToggle.bind(this)}
						       className={"fa " + (this.state.playing ? "fa-stop" : "fa-play")}></i>
						    <div className="header-controls">
						        <span>BPM </span>
						        <input value={this.state.bpm} id='bpm' onChange={evt => this.onChange(evt)} type="number"/>
						        <span>Key </span>
						        <select id="key" value={this.state.key} onChange={evt => this.onChange(evt)}>
							    {this.keyOptions}
						        </select>
						        <select onChange={evt => this.onChange(evt)} id="keyType" value={this.state.keyType}>
							    <option>Maj</option>
							    <option>min</option>
						        </select>
						    </div>
					    </span>
						<div className="song-name">
							<form onSubmit={(evt) => this.onSave(evt)}>
								<input required onChange={evt => this.onChange(evt)} value={this.state.name} id='name'
								       type='text' placeholder='untitled' className="name-input"/>
								<input type='submit' style={{minWidth: '120px'}} value={this.state.saveBtn ? (this.state.saveBtn === 1 ? 'Loading...' : (this.state.saveBtn === 2 ? 'Saved!' : 'Failed!')) : 'Save'} disabled={!!this.state.saveBtn} className={'btn '+(!this.state.saveBtn ? 'btn-light' : this.state.saveBtn !== 3 ? 'btn-success' : 'btn-danger')}/>
							</form>
						</div>
					</div>
					<div className="row">
						<InstrEdit/>
						<BlockEdit block={this.song.activeBlock}/>
					</div>
					<Time/>
				</div>
			</div>
		);
	}
}

export default Editor;
