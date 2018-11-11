## Song Storage Specs


### Overview:

Songs consist of instruments. Each instrument has blocks (pieces of the song) which in turn hold individual notes.

---
### General:
- Store song name and author
- Date created / edited??
- BPM (beats per minute): integer value
- Key: two ascii characters

---
### Instruments:

Instruments are responsible for defining the order that blocks are played in as well as what the blocks will sound like.

- There can be a max of 4 instruments in a song.

**Sound**

- There are a lot of setttings in tone.js for how the synth will sound.
- Instead of keeping track of every possible option. We will store profiles and give the user some customization for the profile.


- [integer value] profile the instrument is using
- [integer value] profile customization a
- [integer value] profile customization b
- [integer value] profile customization c
- [char] profile customization d
- [char] profile customization e

**Order of blocks**

- Blocks will be stored separately from the instrument.
- The instrument must keep track of 8 ordered ID's that refer to the blocks.
- ID must be able to lookup 32 blocks.
---
### Blocks:
A block is responsible for holding the notes and timing for a piece of the song.

- There can be 32 unique blocks in a song.

**Storing notes**

- Each block can be thought of as a two dimensional array.
- The outer dimension is the pitch. 16 pitches.
- Inner dimension is when the note should start playing. 16 starting points for notes.
- The data held in the two dimensional array defines how long the note will play.
- The data should store 16 values. aka 0-15 or 4 bits
---
