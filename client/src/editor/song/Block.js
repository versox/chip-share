const types = ['off', 'on', 'start', 'end', 'mid'];
const dataValues = {
    'off': 0, 'on': 1, 'start': 2, 'end': 3, 'mid': 4
}

// convert block from integer data
var convertFromData = (data, block) => {
    for (let i = 0; i < data.length; i++)
    {
	let dataLine = data[i];
	let line = [];
	for (let j = 0; j < dataLine.length; j++)
	{
	    let value = dataLine[j];
	    line.push({
		type: types[value],
		clickF: function() {
		    if(this.type === 'off')
		    {
			this.type = 'on';
		    }
		    else
		    {
			this.type = 'off';
		    }
		},
		startF: function() {
		    this.type = 'start';
		},
		endF: function() {
		    this.type = 'end';
		},
		midF: function() {
		    this.type = 'mid';
		}	
	    });
	}
	block.push(line);
    }
};

// playable / editable block
class Block {
    constructor(storedBlock) {
	this.block = [];
	if (!storedBlock === undefined) {
	    // load block from data
	    convertFromData(storedBlock, this.block);
	} else {
	    // create blank block
	    for (let i = 0; i < 12; i++) {
		let line = [];
		for(let j = 0; j < 16; j++) {
		    line.push({
			type: 'off',
			clickF: function() {
			    if(this.type === 'off')
			    {
				this.type = 'on';
			    }
			    else
			    {
				this.type = 'off';
			    }
			},
			startF: function() {
			    this.type = 'start';
			},
			endF: function() {
			    this.type = 'end';
			},
			midF: function() {
			    this.type = 'mid';
			}
		    });
		}
		this.block.push(line);
	    }
	}
    }

    convertToData() {
	let data = [];
	for (let i = 0; i < this.block.length; i++) {
	    let line = this.block[i];
	    let dataLine = [];
	    for (let j = 0; j < line.length; j++) {
		let value = line[j].type;
		dataLine.push(dataValues[value]);
	    }
	    data.push(dataLine);
	}
	return data;
    }
}

export default Block;
