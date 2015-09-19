
/**
 * Write a number, in string, with a fix number of digit
 * Fill empty with 0;
 * @param  {[string]}	num [value]
 * @param  {[int]}		len [length]
 * @return {[string]}
 */
var preFillWithZero = function(num, len) {
	num = String(num);
	if (num.length < len) {
		var nbToFill = len - num.length;
		var prefix = "";
		for (var i = 0; i < nbToFill; ++i) {
			prefix += "0";
		};
		num = prefix+num;
	}
	return num;
};

/**
 * Contains a music note, its duration, note's value and velocity
 * @param {[int]} duration [0-255]
 * @param {[int]} note     [21-108]
 * @param {[int]} velocity [0-127]
 */
var Note = function(duration, note, velocity) {
	this.duration = duration | 0;
	this.note =  note | 0;
	this.velocity =  velocity | 0;
	if ( this.note < 21 ) { this.note = 21; }
	if ( this.note > 108 ) { this.note = 108; }
	if ( this.velocity < 0 ) { this.velocity = 0; }
	if ( this.velocity > 127 ) { this.velocity = 127; }
	this.begin = function() {
		return '00' + this.note.toString(16) + this.velocity.toString(16) + " ";
	};
	this.end = function() {
		return preFillWithZero(this.duration.toString(16), 2) + this.note.toString(16) + '00' + " ";
	};
};

/**
 * Contains track with a choosen instrument
 * @param {[int]} track
 * @param {[int]} instrument [0-127]
 */
var Track = function(track, instrument) {
	this.track = track | 0;
	this.instrument = instrument | 0;
	this.notes = [];
	this.addNote = function(note) {
		this.notes.push(note);
	};
	this.chunkLength = function() {
		var chunk = this.notes.length * 6;
		return chunk;
	}
	this.export = function() {
		var notes = "";
		var notesLength = this.notes.length;
		for (var i = 0; i < notesLength; ++i) {
			notes += this.notes[i].begin();
			notes += this.notes[i].end();
		};
		return notes;
	};
};

$(document).ready(function(){

	var keyboard = document.getElementById('keys');
	var pressedKeyShow = document.getElementById('pressedKey');
	var exportMidi = document.getElementById('exportMidi');
	var exportText = document.getElementById('exportText');

	var pressedKey = "";
	var pressedMouse = false;

	var track = new Track(00, 01);

	$(document).on('mousedown', function(){
		pressedMouse = true;
	});
	$(document).on('mouseup', function(){
		pressedMouse = false;
	});
	

	$(keyboard).on('mouseover mousedown', '.key', function(e) {
		if (pressedMouse === true || e.type === "mousedown") {
			if ($(this).hasClass('keywhite')) {
				$(this).addClass('keywhiteactive');
			}
			else if ($(this).hasClass('keyblack')) {
				$(this).addClass('keyblackactive');
			}
			track.addNote(new Note("08", e.currentTarget.id, "127"));
			pressedKey += e.currentTarget.id;
			pressedKeyShow.innerHTML = pressedKey;
		}
	});

	$(keyboard).on('mouseout mouseup', '.key', function(e) {
		if ($(this).hasClass('keywhite')) {
			$(this).removeClass('keywhiteactive');
		}
		else if ($(this).hasClass('keyblack')) {
			$(this).removeClass('keyblackactive');
		}
		pressedKey += " ";
		pressedKeyShow.innerHTML = pressedKey;
	});

	$(exportMidi).on('click', function(e) {
		e.preventDefault();
		exportText.innerHTML = track.export();
		exportText.innerHTML += "<br>" + track.chunkLength();
	});



});

