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

function setCustomShot(v) {
	cShots = notes2Channels(v);
	numShots = Math.floor(v * 10);
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
		case "Acidlizer":
			snareAcid = true;
			break;
		case "Normalizer":
			snareAcid = false;
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
		case "Acidlizer":
			hatsAcid = true;
			break;
		case "Normalizer":
			hatsAcid = false;
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
		case "Acidlizer":
			fxAcid = true;
			break;
		case "Normalizer":
			fxAcid = false;
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

function setShot(v) {
	switch (v) {
		case "Atonal":
			shotTone = false;
			break;
		case "Tones":
			shotTone = true;
			break;
		case "Robotizer":
			shotHuman = false;
			break;
		case "Humanizer":
			shotHuman = true;
			break;
		case "Acidlizer":
			shotAcid = true;
			break;
		case "Normalizer":
			shotAcid = false;
			break;
		case "2s":
			shotSize = 1;
			break;
		case "4s":
			shotSize = 2;
			break;
		case "8s":
			shotSize = 4;
			break;
		case "15s":
			shotSize = 8;
			break;
		case "30s":
			shotSize = 16;
			break;
		case "60s":
			shotSize = 32;
			break;
	}
	if (isNumber(v)) {
		shotNotes = note2Num(1, 8, v);
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
		case "Acidlizer":
			percAcid = true;
			break;
		case "Normalizer":
			percAcid = false;
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
		case "Acidlizer":
			leadAcid = true;
			break;
		case "Normalizer":
			leadAcid = false;
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
		case "Acidlizer":
			vocalAcid = true;
			break;
		case "Normalizer":
			vocalAcid = false;
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
	for (i = 0; i < numShots; i++) {
		channelSequence.push("Shot");
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
	if (shotNotes > 0) {
		meter += ((getLevel(shotSize) / med) * shotNotes) * numShots * 3;
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
}
function setPack(s) {
	pack = s;
}
function setStyle(s) {
	style = s;
}
