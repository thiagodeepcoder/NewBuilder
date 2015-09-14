// Ver 2.3

autowatch = 1;
outlets = 4;
setinletassist(0, "bang triggers action specified in args");
setoutletassist(0, "unique exit of information");

var api;
var liveView;
var liveSetView;
var liveSet;
var trackView;

var sceneSlot;
var sceneSlotClip;

var sCreated = false;

var noteTrack;

var countBangs = 0;

var newGroove = [];
var channelSequence = [];

var sSlicesArray = [];
var channelSlices = [];
var arrayOfNotes = [];

var sSlices = 10;

var cgSelected = 0;

var cStructure = "Agressive";
var cBass = 1;
var cSnares = 1;
var cPercs = 1;
var cHats = 1;
var cFXs = 1;
var cPads = 1;
var cLoops = 1;
var cLeads = 1;
var cVocals = 1;

var breaks = [16, 1];
var verses = [32, 1];

var numBass = 0;
var numSnares = 0;
var numPercs = 0;
var numHats = 0;
var numFXs = 0;
var numPads = 0;
var numLoops = 0;
var numLeads = 0;
var numVocals = 0;

//new 2.0
var introKickBass = false;
var introMiniBreak = false;
var intro = false;
var introSize = 8;
var introPercent = 0;

var outroBass = false;
var outroSmooth = false;
var outro = false;
var outroSize = 16;
var outroPercent = 0;

var verseMiniBreak = false;
var verseSize = 16;
var verseNum = 0;
var verseHumanizer = false;

var breakLong = false;
var breakSize = 8;
var breakNum = 0;
var dropSize = 8;
var breakHumanizer = false;

var kickCut = false;
var kickSC = false;
var kickSize = 16;
var kickNotes = 0;

var bassLowEnd = false;
var bassHuman = false;
var bassTone = false;
var bassSize = 16;
var bassNotes = 1;

var snareSteady = false;
var snareHuman = false;
var snareSize = 16;
var snareNotes = 1;
var snareSteadyReady = false;

var hatsSteady = false;
var hatsHuman = false;
var hatsSize = 16;
var hatsNotes = 1;
var hatsSteadyReady = false;

var fxTone = false;
var fxHuman = false;
var fxSize = 16;
var fxNotes = 1;

var percHuman = false;
var percSize = 16;
var percNotes = 1;

var leadTone = false;
var leadHuman = false;
var leadSize = 16;
var leadNotes = 1;

var vocalTone = false;
var vocalHuman = false;
var vocalSize = 16;
var vocalNotes = 1;

var selectedTypeNewSynth = "";
var kickGrooveNotes = [];

var buildFinish = false;

var meterTotal = 0;

var channelSeqCreated = false;


var DEBUG = true;
var testSingleChannel = [true,"SC"];


// ==================================================
// ======================== Note Creator
// ==================================================

//---------------
// Create Note 60-72
//---------------

function createNotes(t, c, seq) {
    /*if(seq != null)
    {
        setNoteSeq(seq);
    }
    else
    {
        setNoteSeq(this[templateSet[t-1].notes]);
    }*/
    var notes = [];
    var args = newGroove; //getNoteSeq();
    var clip = new Clip(t, c);
    var noteBlock = args.length / 2;

    for (var ni = 0; ni < args.length; ni++) {

        var changedNote = convertNote(args[ni].note);

        if (args[ni].size != 0) {
            notes.push(new Note(changedNote, args[ni].init, args[ni].size, 100, 0));
        }
    }

    clip.setNotes(notes);
}

function changeNotes(t, c, seq) {
    setNoteSeq(this[seq]);
    var notes = [];
    var args = getNoteSeq();
    var clip = new Clip(t, c);
    var noteBlock = args.length / 2;


    for (var ni = 0; ni < args.length; ni++) {

        var changedNote = convertNote(args[ni].note);
        if (args[ni].size != 0) {
            notes.push(new Note(changedNote, (0.25 * ni), args[ni].size * 0.25, 100, 0));
        }
    }

    return notes;
}

function convertNote(n) {
    var c = 57;
    var fNote = n - c;


    for (var nn = 0; nn < noteTrack.length; nn++) {
        if (fNote < 7) {
            if (noteTrack[nn] == fNote) {
                return fNote + c;
            } else if (noteTrack[nn] == fNote + 1) {
                return fNote + c + 1;
            } else if (noteTrack[nn] == fNote + 2) {
                return fNote + c + 2;
            }
        } else {
            if (noteTrack[nn] == fNote) {
                return fNote + c;
            } else if (noteTrack[nn] == fNote - 1) {
                return fNote + c - 1;
            } else if (noteTrack[nn] == fNote - 2) {
                return fNote + c - 2;
            }
        }
    }

}

/*

c = 1
c# = 2
d = 3
d# = 4
e = 5
f = 6
f# = 7
g = 8
g# = 9
a = 10
a# = 11
b = 12

*/

var scaleC = [1, 3, 5, 6, 8, 10, 12];
var scaleCsharp = [1, 2, 4, 6, 7, 9, 11];
var scaleD = [2, 3, 5, 7, 8, 10, 12];
var scaleDsharp = [1, 3, 4, 6, 8, 9, 11];
var scaleE = [2, 4, 5, 7, 9, 10, 12];
var scaleF = [1, 3, 4, 6, 8, 10, 11];
var scaleFsharp = [2, 4, 6, 7, 9, 11, 12];
var scaleG = [1, 3, 5, 7, 8, 10, 12];
var scaleGsharp = [1, 2, 4, 6, 8, 9, 11];
var scaleA = [2, 3, 5, 7, 9, 10, 12];
var scaleAsharp = [1, 3, 4, 6, 8, 10, 11];
var scaleB = [2, 4, 5, 7, 9, 11, 12];


function log() {
    for (var i = 0, len = arguments.length; i < len; i++) {
        var message = arguments[i];
        if (message && message.toString) {
            var s = message.toString();
            if (s.indexOf("[object ") >= 0) {
                s = JSON.stringify(message);
            }
            post(s);
        } else if (message === null) {
            post("<null>");
        } else {
            post(message);
        }
    }
    post("\n");
}


function getColor(name) {
	var fcolor;
	switch (name) {
		case "SC":
			fcolor = [255, 255, 255];
			break;

		case "Kick":
			fcolor = [255, 255, 255];
			break;

		case "Kick cut":
			fcolor = [255, 255, 255];
			break;

		case "Bass":
			fcolor = [255, 0, 0];
			break;

		case "Lowend":
			fcolor = [255, 0, 0];
			break;

		case "Snare":
			fcolor = [255, 190, 0];
			break;

		case "Snare fixo":
			fcolor = [255, 190, 0];
			break;

		case "Hats":
			fcolor = [255, 255, 0];
			break;

		case "Hats fixo":
			fcolor = [255, 255, 0];
			break;

		case "Perc":
			fcolor = [120, 200, 0]
			break;

		case "FX":
			fcolor = [80, 200, 180];
			break;

		case "Pad":
			fcolor = [200, 170, 80];
			break;

		case "Loop":
			fcolor = [200, 100, 250];
			break;
		case "Lead":
			fcolor = [40, 70, 30];
			break;

		case "Vocals":
			fcolor = [40, 70, 200];
			break;
	}
	return fcolor;
}

function getNextFreeSlot(t) {

	setCustomTrack(t);
	var nScenes = liveSet.get("scenes").length / 2;
	var clipCounter = 0;

	for (var ns = 0; ns < nScenes; ns++) {
		var path = "live_set tracks " + t + " clip_slots " + ns;
		var sLot = new LiveAPI(path);
		if (sLot.get("has_clip") == 1) {
			clipCounter++
		} else {
			break;
		}
	}

	return clipCounter;
}

function getTotalChannels() {
	var a = new LiveAPI("live_set");
	var t = a.get("tracks");
	return t.length / 2;
}

function getTrackName(n) {
	var a = new LiveAPI("live_set tracks " + n);
	return a.get("name");
}

function getLevel(n) {
	switch (n) {
		case 1:
			return 5;
			break;
		case 2:
			return 4;
			break;
		case 4:
			return 3;
			break;
		case 8:
			return 2;
			break;
		case 16:
			return 1;
			break;
	}
}


function setTrackName(trackNumber, trackName) {
	var tracks = new LiveAPI("live_set tracks " + trackNumber);
	tracks.set("name", trackName);
}

function setCustomBass(v) {
	cBass = v;
	numBass = cBass;
}

function setCustomSnares(v) {
	cSnares = notes2Channels(v);
	numSnares = Math.floor(v * 5);
}

function setCustomPerc(v) {
	cPercs = v;
	numPercs = Math.floor(v * 5);
}

function setCustomHats(v) {
	cHats = notes2Channels(v);
	numHats = Math.floor(v * 5);
}

function setCustomFX(v) {
	cFXs = notes2Channels(v);
	numFXs = Math.floor(v * 10);
}

function setCustomPad(v) {
	cPads = notes2Channels(v);
	numPads = Math.floor(v * 5);
}

function setCustomLoop(v) {
	cLoops = notes2Channels(v);
	numLoops = Math.floor(v * 5);
}

function setCustomLead(v) {
	cLeads = notes2Channels(v);
	numLeads = Math.floor(v * 5);
}

function setCustomVocals(v) {
	cVocals = notes2Channels(v);
	numVocals = Math.floor(v * 5);
}

function setTempSelect(v) {
	if (v != "Select") {
		var sc;
		var lastChar = v.substr(v.length - 1); // => 1
		for (var i = 0; i < totalDropDowns; i++) {
			sc = this["customTemp" + lastChar][i];
			outlet(4, sc);
			outlet(3, i);
		}
	}
}

function setTrackClip(t, m) {
	var path = "live_set tracks " + t + " clip_slots " + m;
	sceneSlot = new LiveAPI(path);
}

function setClipColor(t, m, rgb) {
	setSceneClip(t, m);
	var red = rgb[0];
	var green = rgb[1];
	var blue = rgb[2];
	sceneSlotClip.set("color", 65536 * red + 256 * green + blue);
}

function setSceneClip(t, m) {
	var path = "live_set tracks " + t + " clip_slots " + m + " clip";
	sceneSlotClip = new LiveAPI(path);
}

function setBuilderChannel() {
	setCustomTrack(0);
	selectedTrack.set("name", "Builder");
}

function setCustomTrack(t) {
	selectedTrack = new LiveAPI("live_set tracks " + t);
}

function setNote(note) {
	if (note.slice(1) == "#") {
		noteTrack = this["scale" + note.slice(0, 1) + "sharp"];
	} else {
		noteTrack = this["scale" + note.slice(0, 1)];
	}
}

function setIntro(v) {
	switch (v) {
		case "Enable":
			intro = true;
			break;
		case "Disable":
			intro = false;
			break;
		case "No Minibreak":
			introKickBass = false;
			break;
		case "With Minibreak":
			introKickBass = true;
			break;
		case "No Kick/Bass":
			introKickBass = false;
			break;
		case "With Kick/Bass":
			introKickBass = true;
			break;
		case "15s":
			introSize = 8;
			break;
		case "30s":
			introSize = 16;
			break;
		case "45s":
			introSize = 24;
			break;
		case "60s":
			introSize = 32;
			break;
	}
	if (isNumber(v)) {
		introPercent = v * 100;
	}
	setNumSlices();
	setTotalTime();
}

function setOutro(v) {
	switch (v) {
		case "Enable":
			outro = true;
			break;
		case "Disable":
			outro = false;
			break;
		case "No Smooth":
			outroSmooth = false;
			break;
		case "With Smooth":
			outroSmooth = true;
			break;
		case "No Bass":
			outroBass = false;
			break;
		case "With Bass":
			outroBass = true;
			break;
		case "30s":
			outroSize = 16;
			break;
		case "45s":
			outroSize = 24;
			break;
		case "60s":
			outroSize = 32;
			break;
		case "90s":
			outroSize = 48;
			break;
		case "120s":
			outroSize = 64;
			break;
	}
	if (isNumber(v)) {
		outroPercent = v * 100;
	}
	setNumSlices();
	setTotalTime();
}

function setVerses(v) {
	switch (v) {
		case "No Mini Break":
			verseMinibreak = false;
			break;
		case "With Mini Break":
			verseMiniBreak = true;
			break;
		case "Humanizer":
			verseHumanizer = true;
			break;
		case "Robotizer":
			verseHumanizer  = false;
			break;
		case "No Long":
			verseLong = false;
			break;
		case "1 Long":
			verseLong = true;
			break;
		case "15s":
			verseSize = 8;
			break;
		case "30s":
			verseSize = 16;
			break;
		case "45s":
			verseSize = 24;
			break;
		case "60s":
			verseSize = 32;
			break;
	}
	if (isNumber(v)) {
		verseNum = v * 10;
	}
	setNumSlices();
	setTotalTime();
}

function setBreaks(v) {
	switch (v) {
		case "No Long":
			breakLong = false;
			break;
		case "1 Long":
			breakLong = true;
			break;
		case "Humanizer":
			breakHumanizer = true;
			break;
		case "Robotizer":
			breakHumanizer  = false;
			break;
		case "15s":
			breakSize = 8;
			break;
		case "30s":
			breakSize = 16;
			break;
		case "45s":
			breakSize = 24;
			break;
		case "60s":
			breakSize = 32;
			break;
		case "16s":
			dropSize = 8;
			break;
		case "32s":
			dropSize = 16;
			break;
	}
	if (isNumber(v)) {
		breakNum = v * 10;
	}
	setNumSlices();
	setTotalTime();
}

function setKick(v) {
	switch (v) {
		case "No Kick cut":
			kickCut = false;
			break;
		case "With Kick cut":
			kickCut = true;
			break;
		case "No SC":
			kickSC = false;
			break;
		case "With SC":
			kickSC = true;
			break;
		case "2s":
			kickSize = 1;
			break;
		case "4s":
			kickSize = 2;
			break;
		case "8s":
			kickSize = 4;
			break;
		case "15s":
			kickSize = 8;
			break;
		case "30s":
			kickSize = 16;
			break;
	}
	if (isNumber(v)) {
		kickNotes = v * 8;
	}
	setMeter();
}

function setBass(v) {
	switch (v) {
		case "No Low End":
			bassLowEnd = false;
			break;
		case "With Low End":
			bassLowEnd = true;
			break;
		case "Robotizer":
			bassHuman = false;
			break;
		case "Humanizer":
			bassHuman = true;
			break;
		case "Atonal":
			bassTone = false;
			break;
		case "Tones":
			bassTone = true;
			break;
		case "2s":
			bassSize = 1;
			break;
		case "4s":
			bassSize = 2;
			break;
		case "8s":
			bassSize = 4;
			break;
		case "15s":
			bassSize = 8;
			break;
		case "30s":
			bassSize = 16;
			break;
		case "60s":
			bassSize = 32;
			break;
	}
	if (isNumber(v)) {
		bassNotes = note2Num(1, 16, v);
		log(bassNotes);
	}
	setMeter();
}

function setSnare(v) {
	switch (v) {
		case "No Steady":
			snareSteady = false;
			break;
		case "With Steady":
			snareSteady = true;
			break;
		case "Robotizer":
			snareHuman = false;
			break;
		case "Humanizer":
			snareHuman = true;
			break;
		case "2s":
			snareSize = 1;
			break;
		case "4s":
			snareSize = 2;
			break;
		case "8s":
			snareSize = 4;
			break;
		case "15s":
			snareSize = 8;
			break;
		case "30s":
			snareSize = 16;
			break;
		case "60s":
			snareSize = 32;
			break;
	}
	if (isNumber(v)) {
		snareNotes = note2Num(1, 8, v);
	}
	setMeter();
}

function setHats(v) {
	switch (v) {
		case "No Steady":
			hatsSteady = false;
			break;
		case "With Steady":
			hatsSteady = true;
			break;
		case "Robotizer":
			hatsHuman = false;
			break;
		case "Humanizer":
			hatsHuman = true;
			break;
		case "2s":
			hatsSize = 1;
			break;
		case "4s":
			hatsSize = 2;
			break;
		case "8s":
			hatsSize = 4;
			break;
		case "15s":
			hatsSize = 8;
			break;
		case "30s":
			hatsSize = 16;
			break;
		case "60s":
			hatsSize = 32;
			break;
	}
	if (isNumber(v)) {
		hatsNotes = note2Num(1, 8, v);
	}
	setMeter();
}

function setFX(v) {
	switch (v) {
		case "Atonal":
			fxTone = false;
			break;
		case "Tones":
			fxTone = true;
			break;
		case "Robotizer":
			fxHuman = false;
			break;
		case "Humanizer":
			fxHuman = true;
			break;
		case "2s":
			fxSize = 1;
			break;
		case "4s":
			fxSize = 2;
			break;
		case "8s":
			fxSize = 4;
			break;
		case "15s":
			fxSize = 8;
			break;
		case "30s":
			fxSize = 16;
			break;
		case "60s":
			fxSize = 32;
			break;
	}
	if (isNumber(v)) {
		fxNotes = note2Num(1, 8, v);
	}
	setMeter();
}

function setPerc(v) {
	switch (v) {
		case "Robotizer":
			percHuman = false;
			break;
		case "Humanizer":
			percHuman = true;
			break;
		case "2s":
			percSize = 1;
			break;
		case "4s":
			percSize = 2;
			break;
		case "8s":
			percSize = 4;
			break;
		case "15s":
			percSize = 8;
			break;
		case "30s":
			percSize = 16;
			break;
	}
	if (isNumber(v)) {
		percNotes = note2Num(1, 8, v);
	}
	setMeter();
}

function setLead(v) {
	switch (v) {
		case "Atonal":
			leadTone = false;
			break;
		case "Tones":
			leadTone = true;
			break;
		case "Robotizer":
			leadHuman = false;
			break;
		case "Humanizer":
			leadHuman = true;
			break;
		case "2s":
			leadSize = 1;
			break;
		case "4s":
			leadSize = 2;
			break;
		case "8s":
			leadSize = 4;
			break;
		case "15s":
			leadSize = 8;
			break;
		case "30s":
			leadSize = 16;
			break;
	}
	if (isNumber(v)) {
		leadNotes = note2Num(1, 16, v);
	}
	setMeter();
}

function setVocals(v) {
	switch (v) {
		case "Atonal":
			vocalTone = false;
			break;
		case "Tones":
			vocalTone = true;
			break;
		case "Robotizer":
			vocalHuman = false;
			break;
		case "Humanizer":
			vocalHuman = true;
			break;
		case "2s":
			vocalSize = 1;
			break;
		case "4s":
			vocalSize = 2;
			break;
		case "8s":
			vocalSize = 4;
			break;
		case "15s":
			vocalSize = 8;
			break;
		case "30s":
			vocalSize = 16;
			break;
	}
	if (isNumber(v)) {
		vocalNotes = note2Num(1, 8, v);
	}
	setMeter();
}

function setChannelLoadSynth(s) {
	selectedTypeNewSynth = s;
	log(selectedTypeNewSynth);
}

function setNumSlices() {
	var i = 0;
	var o = 0;
	if (intro) {
		i = 1;
	}
	if (outro) {
		o = 1;
	}
	sSlices = i + verseNum + breakNum + o;
	log(sSlices);
}

function setChannelSequence() {
	var i;
	channelSequence.push("Kick");

	channelSequence.push("Bass");

	if (numSnares != 0) {
		for (i = 0; i < numSnares; i++) {
			channelSequence.push("Snare");
		}
	} else if (snareSteady && numSnares == 0) {
		channelSequence.push("Snare");
	}
	if (numHats != 0) {
		for (i = 0; i < numHats; i++) {
			channelSequence.push("Hats");
		}
	} else if (hatsSteady && numHats == 0) {
		channelSequence.push("Hats");
	}
	for (i = 0; i < numPercs; i++) {
		channelSequence.push("Perc");
	}
	for (i = 0; i < numFXs; i++) {
		channelSequence.push("FX");
	}
	for (i = 0; i < numLeads; i++) {
		channelSequence.push("Lead");
	}
	for (i = 0; i < numVocals; i++) {
		channelSequence.push("Vocals");
	}
	for (i = 0; i < numPads; i++) {
		channelSequence.push("Pad");
	}
	for (i = 0; i < numLoops; i++) {
		channelSequence.push("Loop");
	}

	channelSeqCreated = true;
}

function setMeter() {

	var meter = 0;
	var med = 300;
	if (kickCut) {
		meter += 0.05;
	}
	if (kickNotes > 0) {
		meter += (getLevel(kickSize) / med) * kickNotes;
	}
	if (bassNotes > 0) {
		meter += (getLevel(bassSize) / med) * bassNotes;
	}
	if (bassLowEnd) {
		meter += 0.05;
	}
	if (snareSteady) {
		meter += 0.05;
	}
	if (hatsSteady) {
		meter += 0.05;
	}
	if (snareNotes > 0) {
		meter += ((getLevel(snareSize) / med) * snareNotes) * numSnares * 3;
	}
	if (hatsNotes > 0) {
		meter += ((getLevel(hatsSize) / med) * hatsNotes) * numHats * 3;
	}
	if (fxNotes > 0) {
		meter += ((getLevel(fxSize) / med) * fxNotes) * numFXs * 3;
	}
	if (percNotes > 0) {
		meter += ((getLevel(percSize) / med) * percNotes) * numPercs * 3;
	}
	if (leadNotes > 0) {
		meter += ((getLevel(leadSize) / med) * leadNotes) * numLeads * 3;
	}
	if (vocalNotes > 0) {
		meter += ((getLevel(vocalSize) / med) * vocalNotes) * numVocals * 3;
	}
	if (numPads > 0) {
		meter += 0.025 * numPads;
	}
	if (numLoops > 0) {
		meter += 0.05 * numLoops;
	}
	outlet(1, meter);
}

function setTotalTime() {
	var totalTime = 0;
	if (intro) {
		totalTime += introSize;
	}
	if (outro) {
		totalTime += outroSize;
	}
	if (verseNum > 0) {
		totalTime += verseSize * verseNum;
	}
	if (breakNum > 0) {
		totalTime += breakSize * breakNum;
	}
	if (breakLong) {
		totalTime += breakSize;
	}
	if (dropSize) {
		totalTime += dropSize * breakNum;
	}
	outlet(2, toHHMMSS(totalTime * 1.9));
}

function setFixedStructure() {
	sSlicesArray = [];
	createStructure();
	sCreated = true;
	log(sSlicesArray);

}


function createScene(ns) {
    var n = ns - ((liveSet.get("scenes").length) / 2);
    for (var m = 0; m < n; m++) {
        liveSet.call("create_scene", ((liveSet.get("scenes").length) / 2));
    }
}

function createTrack(name) {
    liveSet.call("create_midi_track", (liveSet.get("tracks").length / 2));
    setTrackName((liveSet.get("tracks").length / 2) - 1, name);
}

function createTTrack(name) {
    liveSet.call("create_audio_track", (liveSet.get("tracks").length / 2));
    setTrackName((liveSet.get("tracks").length / 2) - 1, name);
}

function createClipCustom(t, c, s, fill, name, plus) {
    setTrackClip(t, c);
    sceneSlot.call("create_clip", "" + s * 4);
    setSceneClip(t, c);
    if (plus) {
        sceneSlotClip.set("name", "New " + name);
    }
    var getcolor = getColor(name);
    if (fill == "blank") {
        setClipColor(t, c, [50, 50, 50]);
    } else {
        setClipColor(t, c, getcolor);
    }
}

function createCSequence(s) {
	if (s == "SC") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			channelSlices.push({
				seq: "filled",
				steps: sSlicesArray[i].steps
			});
		}
	} else if (s == "Kick") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (!outroSmooth) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Kick cut") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				if (randomInt(0, 3) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (outroSmooth) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Bass") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (!outroSmooth) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Lowend") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "outro") {
				if (!outroSmooth) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (introKickBass) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			}else {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Loop") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" ) {
				if (randomInt(0, 1) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) >= outroPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) >= introPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Snare") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak" || sSlicesArray[i].slice == "drop") {
				if (randomInt(0, 1) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) >= outroPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) >= introPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Snare fixo") {
		//var gnc = getNameC(s);
		//var getSeq = gnc[randomInt(0, gnc.length - 1)];
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				if (randomInt(0, 1) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Hats") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				if (randomInt(0, 1) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) <= outroPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) <= introPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "verso") {
				if (randomInt(0, 1) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else // todos os drops
			{
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Hats fixo") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break") {
				if (randomInt(0, 2) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "intro" || sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 2) == 1) {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				}
			} else // todos os drops
			{
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Perc" || s == "FX" || s == "Lead" || s == "Vocals") {
		// var gnc = getNameC(s);
		//var getSeq = gnc[randomInt(0, gnc.length - 1)];
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				if (randomInt(0, 1) == 1) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) <= introPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) <= outroPercent) {
					channelSlices.push({
						seq: "filled",
						steps: sSlicesArray[i].steps
					});
				} else {
					channelSlices.push({
						seq: "blank",
						steps: sSlicesArray[i].steps
					});
				}
			} else // todos os drops
			{
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Pad") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			} else {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			}
		}
	}
}


function createGroove(instrument) {
	newGroove = [];
	var channelGroove = instrument;
	var numberNotes;

	if (channelGroove == "Kick" || channelGroove == "Kick cut" || channelGroove == "SC") {
		if (kickGrooveNotes == '') {
			numberNotes = 64;
			var kickC = 0;
			for (var i = 0; i < numberNotes; i++) {
				newGroove.push({
					note: 60,
					init: i,
					size: 1
				});
			}
			var randInit;
			for (var j = 0; j < 16 / kickSize; j++) {
				if (j == 0) {
					for (var i = 0; i < kickNotes; i++) {

						randInit = randomInt(0, kickSize * 8);

						while (isInArray(randInit, arrayOfNotes)) {
							randInit = randomInt(0, kickSize * 8);
						}
						if (isOdd(randInit) == 0) {
							randInit += 1;
						}
						arrayOfNotes.push(randInit);
						newGroove.push({
							note: 60,
							init: randInit / 2,
							size: 0.5
						});
					}
				} else {
					for (var i = 0; i < kickNotes; i++) {
						newGroove.push({
							note: 60,
							init: ((arrayOfNotes[i]) / 2) + ((j * kickSize * 4)),
							size: 0.5
						});
					}
				}
			}
			kickGrooveNotes = newGroove;
		} else {
			newGroove = kickGrooveNotes;
		}
		//kickGrooveNotes = [];
	} else if (channelGroove == "Snare fixo") {
		numberNotes = 32;
		for (var i = 0; i < numberNotes; i++) {
			if (i == 0) {
				newGroove.push({
					note: 60,
					init: 1,
					size: 1
				});
			} else {
				newGroove.push({
					note: 60,
					init: i + (i + 1),
					size: 1
				});
			}

		}
	} else if (channelGroove == "Perc") {

		var randInit;
		var human = 0;
		for (var j = 0; j < 16 / percSize; j++) {
			if (j == 0) {
				for (var i = 0; i < percNotes; i++) {
					if (percHuman) {
						human = randomInt(1, 4) / 8;
					} else {
						human = 0;
					}
					randInit = randomInt(0, percSize * 16) + human;
					arrayOfNotes.push(randInit);
					newGroove.push({
						note: 60,
						init: randInit / 4,
						size: 1
					});
				}
			} else {
				for (var i = 0; i < percNotes; i++) {
					newGroove.push({
						note: 60,
						init: ((arrayOfNotes[i]) / 4) + ((j * percSize * 4)),
						size: 1
					});
				}
				log((j * hatsSize));
			}
		}
	} else if (channelGroove == "Snare") {
		var randInit;
		var human = 0;
		for (var j = 0; j < 16 / snareSize; j++) {
			if (j == 0) {
				for (var i = 0; i < snareNotes; i++) {
					if (snareHuman) {
						human = randomInt(1, 4) / 8;
					} else {
						human = 0;
					}
					randInit = randomInt(0, snareSize * 16) + human;
					arrayOfNotes.push(randInit);
					newGroove.push({
						note: 60,
						init: randInit / 4,
						size: 1
					});
				}
			} else {
				for (var i = 0; i < snareNotes; i++) {
					newGroove.push({
						note: 60,
						init: ((arrayOfNotes[i]) / 4) + ((j * snareSize * 4)),
						size: 1
					});
				}
				log((j * snareSize));
			}
		}
	} else if (channelGroove == "Hats fixo") {
		numberNotes = 64;
		for (var i = 0; i < numberNotes; i++) {
			newGroove.push({
				note: 60,
				init: i + 0.5,
				size: 1
			});
		}
	} else if (channelGroove == "Hats") {

		var randInit;
		var human = 0;
		for (var j = 0; j < 16 / hatsSize; j++) {
			if (j == 0) {
				for (var i = 0; i < hatsNotes; i++) {
					if (hatsHuman) {
						human = randomInt(1, 4) / 8;
					} else {
						human = 0;
					}
					randInit = randomInt(0, hatsSize * 16) + human;
					arrayOfNotes.push(randInit);
					newGroove.push({
						note: 60,
						init: randInit / 4,
						size: 1
					});
				}
			} else {
				for (var i = 0; i < hatsNotes; i++) {
					newGroove.push({
						note: 60,
						init: ((arrayOfNotes[i]) / 4) + ((j * hatsSize * 4)),
						size: 1
					});
				}
				log((j * hatsSize));
			}
		}
	} else if (channelGroove == "FX") {

		numberNotes = cgSelected;
		var randInit;
		var human = 0;
		var toneFX = 0;
		var toneArray = [];
		for (var j = 0; j < 16 / fxSize; j++) {
			if (j == 0) {
				for (var i = 0; i < fxNotes; i++) {
					if (fxHuman) {
						human = randomInt(1, 4) / 8;
					} else {
						human = 0;
					}
					randInit = randomInt(0, fxSize * 16) + human;

					if (fxTone) {
						toneFX = randomInt(57, 63);
					} else {
						toneFX = 60;
					}
					toneArray.push(toneFX);
					arrayOfNotes.push(randInit);
					newGroove.push({
						note: toneFX,
						init: randInit / 4,
						size: 1
					});
				}
			} else {
				for (var i = 0; i < fxNotes; i++) {
					newGroove.push({
						note: toneArray[i],
						init: ((arrayOfNotes[i]) / 4) + ((j * fxSize * 4)),
						size: 1
					});
				}
			}
		}
	} else if (channelGroove == "Pad") {

		var randInit;
		for (var i = 0; i < 8; i++) {
			newGroove.push({
				note: 60,
				init: i * 8,
				size: 8
			});
		}

		// código para pad com variação de notas

		/*numberNotes = cgSelected;
		var randInit;
		for (var i = 0; i < numberNotes; i++) {
		    randInit = randomInt(0, 256);
		    newGroove.push({
		        note: randomInt(60, 72),
		        init: randInit / 4,
		        size: 4
		    });
		}*/
	} else if (channelGroove == "Lead") {
		var randInit;
		var human = 0;
		var toneLead = 0;
		var toneArray = [];
		var human = 0;
		for (var j = 0; j < 16 / leadSize; j++) { // 256/quanNotes
			if (j == 0) { // cria sequencia base a ser duplicada
				for (var i = 0; i < leadNotes; i++) {
					if (leadHuman) {
						human = randomInt(1, 4) / 8;
					} else {
						human = 0;
					}
					randInit = randomInt(0, leadSize * 16) + human;
					while (isInArray(randInit, arrayOfNotes)) {
						randInit = randomInt(0, leadSize * 16) + human;
					}

					arrayOfNotes.push(randInit);

					if (leadTone) {
						toneLead = randomInt(57, 67);
					} else {
						toneLead = 60;
					}

					toneArray.push(toneLead);
					newGroove.push({
						note: toneLead,
						init: randInit / 4,
						size: 0.5
					});
				}
			} else { // duplica sequencia até atingir 64
				for (var i = 0; i < leadNotes; i++) {
					newGroove.push({
						note: toneArray[i],
						init: (arrayOfNotes[i] / 4) + ((j * leadSize) * 4),
						size: 0.5
					});
				}
			}
		}
	} else if (channelGroove == "Vocals") {
		var randInit;
		var human = 0;
		var toneVocal = 0;
		var toneArray = [];
		for (var j = 0; j < 16 / vocalSize; j++) {
			if (j == 0) { // cria sequencia base a ser duplicada
				for (var i = 0; i < vocalNotes; i++) {
					if (vocalHuman) {
						human = randomInt(1, 4) / 8;
					} else {
						human = 0;
					}
					randInit = randomInt(0, vocalSize * 16) + human;

					if (vocalTone) {
						toneVocal = randomInt(57, 67);
					} else {
						toneVocal = 60;
					}
					log(toneVocal);
					toneArray.push(toneVocal);
					arrayOfNotes.push(randInit);
					newGroove.push({
						note: toneVocal,
						init: randInit / 4,
						size: 1
					});
				}
			} else { // duplica sequencia até atingir 64
				for (var i = 0; i < vocalNotes; i++) {
					newGroove.push({
						note: toneArray[i],
						init: (arrayOfNotes[i] / 4) + ((j * vocalSize) * 4),
						size: 1
					});
				}
			}
		}
	} else if (channelGroove == "Lowend" || channelGroove == "Loop") {
		log(newGroove);
		numberNotes = cgSelected;
		var randInit = 8;
		for (var i = 0; i < randInit; i++) {
			newGroove.push({
				note: 60,
				init: i * 8,
				size: 8
			});
		}
	} else if (channelGroove == "Bass") {

		var randInit;
		var tone = 0;
		var toneArray = [];
		var variation = 0;

		var size = bassSize;
		var human = bassHuman;
		var notes = bassNotes
		var iTone = bassTone


		for (var j = 0; j < 64 / size; j++) { // 256/quanNotes
			if (j == 0) { // cria sequencia base a ser duplicada
				for (var i = 0; i < notes; i++) {
					if (human == 1) {
						variation = randomInt(1, 4) / 8;
					} else {
						variation = 0;
					}

					do {
						randInit = randomInt(1, size * 4);
					}
					while (isInArray(randInit, arrayOfNotes));


					if (randInit % 4 == 0) {
						randInit++;
					}
					arrayOfNotes.push(randInit);

					if (iTone) {
						tone = randomInt(58, 62);
					} else {
						tone = 60;
					}
					log(randInit);
					toneArray.push(tone);
					newGroove.push({
						note: tone,
						init: (randInit + variation) / 4,
						size: 0.5
					});
				}
			} else { // duplica sequencia até atingir 64
				for (var i = 0; i < notes; i++) {
					newGroove.push({
						note: toneArray[i],
						init: ((arrayOfNotes[i] + variation) / 4) + ((j * size * 4) / 4),
						size: 0.5
					});
				}
			}
		};
	}
}


function createStructure() {
	var rand;
	var vCounter = 0;
	var bCounter = 0;
	var kbMinibreak = 0;
	for (var i = 0; i < sSlices; i++) {
		//entra no Intro
		if (i == 0 && intro == true) {
			rand = introSize;
			if (introMiniBreak) {
				kbMinibreak = 4;
			}
			sSlicesArray.push({
				slice: "intro",
				steps: rand - kbMinibreak
			});
			if (introMiniBreak) {
				sSlicesArray.push({
					slice: "break",
					steps: 4
				});
				sSlicesArray.push({
					slice: "drop",
					steps: dropSize
				});
			}
		}
		//entra no verso
		else if (i == 1) {
			chanceOfBreak();
			vCounter++;
		} else if (i > 1 && i < sSlices - 1) {
			if (vCounter < verseNum || bCounter < breakNum) {

				var randin = randomInt(0, 1);

				var bHumanizer = 0;
				if (breakHumanizer) {
					bHumanizer  = randomInt(-1, 1)*2;
				}

				if (randin == 0) { // 0 escolhe break
					if (bCounter < breakNum) // check se tem breaks avaliable
					{
						sSlicesArray.push({
							slice: "break",
							steps: breakSize + bHumanizer
						});
						log(breakSize + bHumanizer);
						if (breakLong ) {
							sSlicesArray.push({
								slice: "break",
								steps: breakSize
							});
							breakLong = false;
						} 
						sSlicesArray.push({
							slice: "drop",
							steps: dropSize
						});
						bCounter++;
					} else {
						chanceOfBreak();
						vCounter++;
					}

				} else if (randin == 1) { // 1 escolhe verso
					if (vCounter < verseNum ) // check se tem verses avaliable
					{
						chanceOfBreak();
						vCounter++;
					} else {
						sSlicesArray.push({
							slice: "break",
							steps: breakSize + bHumanizer
						});
						sSlicesArray.push({
							slice: "drop",
							steps: dropSize
						});
						bCounter++;
					}
				}
			}
		} else if (i == sSlices - 1 && outro == true) { // último
			rand = outroSize;
			sSlicesArray.push({
				slice: "outro",
				steps: rand
			});
		}
	}
}


//--------------------------------------------------------------------
// Note class
  
function Note(pitch, start, duration, velocity, muted) {
  this.pitch = pitch;
  this.start = start;
  this.duration = duration;
  this.velocity = velocity;
  this.muted = muted;
}
  
Note.prototype.toString = function() {
  return '{pitch:' + this.pitch +
         ', start:' + this.start +
         ', duration:' + this.duration +
         ', velocity:' + this.velocity +
         ', muted:' + this.muted + '}';
}
 
Note.MIN_DURATION = 1/128;
  
Note.prototype.getPitch = function() {
  if(this.pitch < 0) return 0;
  if(this.pitch > 127) return 127;
  return this.pitch;
}
  
Note.prototype.getStart = function() {
  // we convert to strings with decimals to work around a bug in Max
  // otherwise we get an invalid syntax error when trying to set notes
  if(this.start <= 0) return "0.0";
  return this.start.toFixed(4);
}
  
Note.prototype.getDuration = function() {
  if(this.duration <= Note.MIN_DURATION) return Note.MIN_DURATION;
  return this.duration.toFixed(4); // workaround similar bug as with getStart()
}
  
Note.prototype.getVelocity = function() {
  if(this.velocity < 0) return 0;
  if(this.velocity > 127) return 127;
  return this.velocity;
}
  
Note.prototype.getMuted = function() {
  if(this.muted) return 1;
  return 0;
}
 

function loadDefaults(s) {
	outlet(0, "loaddev Simpler");
	if (s == "Kick cut") {
		loadDevice("EQ Eight", "LowCut");
	} else if (s == "FX" || s == "Perc") {
		loadDeviceU("Reverb");
	} else if (s == "Snare fixo" || s == "Tops fixo" || s == "Snare" || s == "Tops") {
		loadDeviceU("Reverb");
		loadDevice("EQ Eight", "LowCut");
	} else if (s == "Bass" || s == "Lowend") {
		loadDeviceU("Compressor");
	}
}

function loadDeviceU(d) {
	outlet(0, "loaddev " + d);
}

function loadDevice(p) {
	outlet(0, "loaddev Instrument Rack");
	var s;

	if (p == "SC") {
		s = "Kick";
	} else if (p == "Kick cut") {
		s = "Kickcut";
	} else if (p == "Hats fixo") {
		s = "Hats";
	} else if (p == "Snare fixo") {
		s = "Snare";
	} else {
		s = p;
	}
	var array = this[s.toLowerCase() + "Array"];
	var synth = pack + style + s + randomInt(array[0],array[1]);
	log(synth); //pack0dubKickcut0

	outlet(0, "swap " + synth);
}

function loadNewSynth() {
	loadDefaults(selectedTypeNewSynth);
}



//--------------------------------------------------------------------
// Clip class
 
function Clip(t,m) {
  var path = "live_set tracks " + t + " clip_slots " + m + " clip";
  this.liveObject = new LiveAPI(path);
}
  
Clip.prototype.getLength = function() {
  return this.liveObject.get('length');
}
  
Clip.prototype._parseNoteData = function(data) {
  var notes = [];
  // data starts with "notes"/count and ends with "done" (which we ignore)
  for(var i=2,len=data.length-1; i<len; i+=6) {
    // and each note starts with "note" (which we ignore) and is 6 items in the list
    var note = new Note(data[i+1], data[i+2], data[i+3], data[i+4], data[i+5]);
    notes.push(note);
  }
  return notes;
}
  
Clip.prototype.getSelectedNotes = function() {
  var data = this.liveObject.call('get_selected_notes');
  return this._parseNoteData(data);
}
  
   
Clip.prototype.getNotes = function(startTime, timeRange, startPitch, pitchRange) {
  if(!startTime) startTime = 0;
  if(!timeRange) timeRange = this.getLength();
  if(!startPitch) startPitch = 0;
  if(!pitchRange) pitchRange = 128;
   
  var data = this.liveObject.call("get_notes", startTime, startPitch, timeRange, pitchRange);
  return this._parseNoteData(data);
}
 
Clip.prototype._sendNotes = function(notes) {
  var liveObject = this.liveObject;
  liveObject.call("notes", notes.length);
  notes.forEach(function(note) {
    liveObject.call("note", note.getPitch(),
                    note.getStart(), note.getDuration(),
                    note.getVelocity(), note.getMuted());
  });
  liveObject.call('done');
}
  
Clip.prototype.replaceSelectedNotes = function(notes) {
  this.liveObject.call("replace_selected_notes");
  this._sendNotes(notes);
}
  
Clip.prototype.setNotes = function(notes) {
  this.liveObject.call("set_notes");
  this._sendNotes(notes);
}
 
Clip.prototype.selectAllNotes = function() {
  this.liveObject.call("select_all_notes");
}
 
Clip.prototype.replaceAllNotes = function(notes) {
  this.selectAllNotes();
  this.replaceSelectedNotes(notes);
}



setNote("C");

setMeter();

setTotalTime();

//setSelectors();


function singleMidi(s) {
	api = new LiveAPI("this_device");
	liveView = new LiveAPI("live_app view");
	liveSetView = new LiveAPI("live_set view");
	liveSet = new LiveAPI("live_set");

	liveView.call("focus_view", "Session");

	var nextFeeeMidi = getNextFreeSlot(0);
	var sizeSelected = 16;
	if (s == "Kick") {
		sizeSelected = kickSize;
	}

	if (s == "Snare") {
		sizeSelected = snareSize;
	}

	if (s == "Hats") {
		sizeSelected = hatsSize;
	}

	if (s == "Bass") {
		sizeSelected = bassSize;
	}

	if (s == "FX") {
		sizeSelected = fxSize;
	}

	createGroove(s);
	createClipCustom(0, nextFeeeMidi, 16, "filled", s, true);
	createNotes(0, nextFeeeMidi);

	resetBang();
}


function singleChannel(s) {
	api = new LiveAPI("this_device");
	liveView = new LiveAPI("live_app view");
	liveSetView = new LiveAPI("live_set view");
	liveSet = new LiveAPI("live_set");
	createScene(30);
	if (sCreated) {
		if (s == "Kick" && kickSC) {
			channelBang("SC");
		}

		if (s == "Snare" && snareSteady && !snareSteadyReady) {
			channelBang("Snare fixo");
			snareSteadyReady = true;
		}

		if (s == "Hats" && hatsSteady && !hatsSteadyReady) {
			channelBang("Hats fixo");
			hatsSteadyReady = true;
		}

		if (s == "Hats" && numHats > 0 || s == "Snare" && numSnares > 0 || s != "Snare" && s != "Hats") {
			channelBang(s);
			 log(s);
		}


		if (s == "Kick" && kickCut) {
			channelBang("Kick cut");
		}

		if (s == "Bass" && bassLowEnd) {
			channelBang("Lowend");
		}


	}
}

function channelBang(s) {

	liveView.call("focus_view", "Session");

	var nextTrack = getTotalChannels();
	setCustomTrack(nextTrack); // seta a selectedTrack
	createTrack(s); // cria um novo channel

	trackView = new LiveAPI("live_set tracks " + Number(nextTrack) + " view");
	trackView.set("is_collapsed", "1");

	createCSequence(s); // cria sequencia do canal de midi timeline
	createGroove(s); //cria groove

	//loadDefaults(nextTrack);
	loadDevice(s);
	var nextFeeeMidi;

	for (var i = 0; i < channelSlices.length; i++) { // Sequencia de slices do canal
		for (var j = 0; j < channelSlices[i].steps / 16; j++) {
			nextFeeeMidi = getNextFreeSlot(nextTrack);
			if (channelSlices[i].steps % 16 == 0) {
				finalSteps = 16;
			} else {
				finalSteps = channelSlices[i].steps;
			}

			createClipCustom(nextTrack, nextFeeeMidi, finalSteps, channelSlices[i].seq, s, false); //sSlicesArray[i].slice

			if (channelSlices[i].seq != "blank") {
				createNotes(nextTrack, nextFeeeMidi);
			}
		}
	}

	setBuilderChannel();
	resetBang();

}

// exemplo pack01dubKick0

var style = "dub";
var pack = "pack0"

var kickArray = [0,6];
var kickBaseName = "Kick";

var kickcutArray = [0,6];
var kickcutBaseName = "Kickcut";

var bassArray = [0,21];
var bassBaseName = "Bass";

var lowendArray = [0,7];
var lowendBaseName = "Lowend";

var snareArray = [0,17];
var snareBaseName = "Snare";

var hatsArray = [0,7];
var hatsBaseName = "Hat";

var percArray = [0,0];
var percBaseName = "Perc";

var fxArray = [0,27];
var fxBaseName = "FX";

var leadArray = [0,0];
var leadBaseName = "Lead";

var padArray = [0,14];
var padBaseName = "Texture";

var vocalsArray = [0,10];
var vocalsBaseName = "Vocal";

var loopArray = [0,9];
var loopsBaseName = "Loop";



function setTemplate(s) {
	if (s == "Broken") {
		intro = true;
		introSize = 32;
		introPercent = 20;

		outro = true;
		outroSize = 48;
		outroPercent = 25;

		verseMiniBreak = true;
		verseSize = 16;
		verseNum = 3;

		breakLong = true;
		breakSize = 16;
		breakNum = 2;
		dropSize = 16;

		kickCut = true;
		kickSC = true;
		kickNotes = 1;
		kickSize = 16;

		bassSize = 8;
		bassNotes = 6;

		snareSteady = true;
		snareHuman = true;
		snareSize = 16;
		snareNotes = 2;

		hatsSteady = true;
		hatsSize = 16;
		hatsNotes = 2;

		fxTone = true;
		fxHuman = true;
		fxSize = 16;
		fxNotes = 2;

		percSize = 16;
		percNotes = 2;

		leadSize = 16;
		leadNotes = 3;

		vocalSize = 16;
		vocalNotes = 2;

		numBass = 1;
		numSnares = 1;
		numPercs = 2;
		numHats = 2;
		numFXs = 10;
		numPads = 3;
		numLoops = 2;
		numLeads = 1;
		numVocals = 1;
	} else if (s == "Comun") {
		intro = true;
		introSize = 16;
		introPercent = 40;

		outro = true;
		outroSize = 48;
		outroPercent = 45;

		verseMiniBreak = true;
		verseSize = 16;
		verseNum = 4;
		verseHumanizer = true;

		breakLong = true;
		breakSize = 8;
		breakNum = 3;
		dropSize = 8;

		kickSC = true;
		kickNotes = 1;
		kickSize = 16;

		bassSize = 16;
		bassNotes = 10;

		snareSteady = true;
		snareHuman = true;
		snareSize = 16;
		snareNotes = 2;

		hatsSteady = true;
		hatsSize = 16;
		hatsNotes = 4;

		fxTone = true;
		fxHuman = true;
		fxSize = 16;
		fxNotes = 3;

		percSize = 16;
		percNotes = 1;

		leadSize = 16;
		leadNotes = 2;

		vocalSize = 16;
		vocalNotes = 1;

		numBass = 1;
		numSnares = 1;
		numPercs = 3;
		numHats = 3;
		numFXs = 5;
		numPads = 1;
		numLoops = 3;
		numLeads = 1;
		numVocals = 1;
	} else if (s == "Ambient") {
		intro = true;
		introSize = 16;
		introPercent = 40;

		outro = true;
		outroSize = 32;
		outroPercent = 30;
		outroSmooth = true;

		verseSize = 16;
		verseNum = 4;
		verseHumanizer = true;

		breakLong = true;
		breakSize = 16;
		breakNum = 2;
		dropSize = 16;

		kickSC = true;
		kickNotes = 2;
		kickSize = 16;

		bassLowEnd = true;
		bassSize = 4;
		bassNotes = 7;

		snareSteady = true;
		snareSize = 16;
		snareNotes = 1;

		hatsSteady = true;
		hatsSize = 16;
		hatsNotes = 2;

		fxHuman = true;
		fxSize = 16;
		fxNotes = 1;

		percSize = 16;
		percNotes = 1;

		vocalSize = 16;
		vocalNotes = 1;

		numBass = 1;
		numSnares = 2;
		numPercs = 2;
		numHats = 2;
		numFXs = 6;
		numPads = 2;
		numLoops = 1;
		numVocals  = 2;
	} else if (s == "Experimental") {
		intro = true;
		introSize = 16;
		introPercent = 40;

		outro = true;
		outroSize = 32;
		outroPercent = 40;
		outroSmooth  = true;

		verseSize = 16;
		verseNum = 4;
		verseHumanizer = true;
		verseMiniBreak  = true;

		breakSize = 32;
		breakNum = 2;
		dropSize = 16;

		kickSC = true;
		kickNotes = 3;
		kickSize = 16;
		kickCut = true;

		bassLowEnd = true;
		bassSize = 16;
		bassNotes = 7;

		snareSteady = true;
		snareSize = 16;
		snareNotes = 1;

		hatsSteady = true;
		hatsSize = 16;
		hatsNotes = 2;

		fxHuman = true;
		fxSize = 16;
		fxNotes = 1;

		vocalSize = 16;
		vocalNotes = 1;

		numBass = 1;
		numSnares = 1;
		numPercs = 0;
		numHats = 1;
		numFXs = 8;
		numPads = 2;
		numLoops = 3;
		numVocals  = 1;
	}

	setMeter();
	setTotalTime();
	setNumSlices();
	setSelectors();
}


function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceOfBreak() {
	var vHumanizer = 0;
	if (verseHumanizer) {
		vHumanizer = randomInt(1, 2) * 2;
	}
	if (verseMiniBreak == true && randomInt(0, 99) < 75 ) { //check se vai ter break
		if (verseSize == 16) // check tamanho do verso
		{
			sSlicesArray.push({
				slice: "verso",
				steps: 12 + vHumanizer
			});
			sSlicesArray.push({
				slice: "minibreak",
				steps: 4
			});
		} else if (verseSize == 32) // verso grande
		{
			sSlicesArray.push({
				slice: "verso",
				steps: 16
			});
			sSlicesArray.push({
				slice: "verso",
				steps: 12 + vHumanizer
			});
			sSlicesArray.push({
				slice: "minibreak",
				steps: 4
			});
		}
		//}

	} else {

		sSlicesArray.push({
			slice: "verso",
			steps: verseSize - vHumanizer
		});
	}
}

function addToChannelStructure(n, s) {
	if (!isInArray(s, channelSequence)) {
		for (var i = 0; i < n; i++) {
			channelSequence.push(s);
		}
	}
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

function tGroove(s) {
	var n;
	switch (s) {
		case "Shortest":
			n = 16;
			break
		case "Short":
			n = 8;
			break
		case "Long":
			n = 4;
			break
		case "Longest":
			n = 2;
			break
		case "Sparse":
			n = 1;
			break
		case "Broken":
			n = 5;
			break
	}
	return n;
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isOdd(num) {
	return num % 2;
}

function note2Num(min, max, percentage) {
	var v = Math.floor(((max - min) * percentage) + min);
	return v;
}

function notes2Channels(n) {
	switch (n) {
		case 0.2:
			return 1;
			break
		case 0.4:
			return 2;
			break
		case 0.6:
			return 3;
			break
		case 0.8:
			return 4;
			break
		case 1:
			return 5;
			break
	}
}

function resetBang() {
	arrayOfNotes = [];
	channelSlices = [];

}

function toHHMMSS(n) {
	var sec_num = parseInt(n, 10); // don't forget the second param
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var time = minutes + ':' + seconds;
	return time;
}


function setSelectors(v) {
	//outlet(3,v);
	log(v);
}


function setSelTemplate(a,v) {
	log(a,v);
	//outlet(3,v);
}

function bang() {
	api = new LiveAPI("this_device");
	liveView = new LiveAPI("live_app view");
	liveSetView = new LiveAPI("live_set view");
	liveSet = new LiveAPI("live_set");
	if (!buildFinish) {
		//cria slices da estrutura
		if (!sCreated) {
			createStructure();
			sCreated = true;
		}
		if(!channelSeqCreated) {
			setChannelSequence();
		}

		log(sSlicesArray);
		createMusic(channelSequence[countBangs]);

		if (countBangs < channelSequence.length - 1) {
			//if (countBangs < 1) {
			countBangs++;
			bang();
		} else {
			//sCreated = false;
			buildFinish = true;
			countBangs = 0;

			var muteT = new LiveAPI("live_set tracks 1");
			muteT.set("mute", "1");
			//sSlicesArray = [];
		}
	}
}

function createMusic(s) {
	// cria cada canal    
	singleChannel(s);
}




