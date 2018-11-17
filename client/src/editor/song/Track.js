class Track {
    constructor(track) {
	if (!track === undefined) {
	    this.track = track;
	} else {
	    this.track = {
		blocks: [
		    1
		],
		settings: {
		    typeId: 1,
		    metadata: "123ab"
		}
	    }
	}
    }
}

export default Track;
