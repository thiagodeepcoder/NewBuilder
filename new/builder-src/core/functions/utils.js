function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceOfBreak() {
	var vHumanizer = 0;
	if (verseHumanizer) {
		vHumanizer = randomInt(-2, 2) * 2;
	}
	if (verseMiniBreak == true && randomInt(0, 99) < 50) { //check se vai ter break
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
		if(vHumanizer<0)
		{
			vHumanizer = vHumanizer*-1;
		}
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
	log(array.indexOf(value));
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

function readystatechange_parsejson() {
	if (this.readyState == 4) {
		jsonData = JSON.parse(this.responseText);
		var myobj = JSON.parse(this.responseText);
		var i, j;
		for (i = 0; i < jsonData.synths.length; i++) {
			styleArray.push(jsonData.synths[i].style);

			for (j = 0; j < jsonData.synths[i].packs.length; j++) {
				packArray.push(jsonData.synths[i].packs[j].pack);
			}
		}
		for (i = 0; i < jsonData.templates.length; i++) {
			templateArray.push(jsonData.templates[i].name);
		}
	}
	var finalpa = packArray;
	finalpa.unshift("all");
	outlet(3, "_parameter_range", finalpa);

	var finalsa = styleArray;
	finalsa.unshift("all");
	outlet(4, "_parameter_range", finalsa);

	var finalt = templateArray;
	finalt.unshift("Select");
	outlet(5, "_parameter_range", finalt);

	styleArray.shift();
	packArray.shift();

	JSONLoaded = true;

}

function readJSON() {
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("GET", jsonHost);
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send("{}");
}

function getSynth(synth) {
	var i;
	var _pack;
	var _style;
	var _synth;
	//style
	for (i = 0; i < jsonData.synths.length; i++) {
		if (jsonData.synths[i].style == selectedStyle) {
			_style = i;
			break;
		}
	}

	//pack
	for (i = 0; i < jsonData.synths[_style].packs.length; i++) {
		if (jsonData.synths[_style].packs[i].pack == selectedPack) {
			_pack = i;
			break;
		}
	}
	//synth
	for (i = 0; i < jsonData.synths[_style].packs[_pack].content.length; i++) {
		if (jsonData.synths[_style].packs[_pack].content[i].synth == synth) {
			_synth = i;
			break;
		}
	}
	var totalSynths = jsonData.synths[_style].packs[_pack].content[_synth].instruments.length;
	var indexSynth = randomInt(0, totalSynths - 1);
	var choosenSynth = jsonData.synths[_style].packs[_pack].content[_synth].instruments[indexSynth];
	log("Style: " + _style);
	log("Pack: " + _pack);
	log("Synth: " + _synth);
	log("Total Synths: " + totalSynths);
	log("Index: " + indexSynth);
	log("Choosen: " + choosenSynth);

	return choosenSynth;
}

function getKeys(keys, obj, path) {
	for (key in obj) {
		var currpath = key;
		keys.push([key]);
		if (typeof(obj[key]) == 'object' && !(obj[key] instanceof Array))
			getKeys(keys, obj[key], currpath);
	}
}

function setTemplatesJSON(s) {
	if (JSONLoaded) {
		var totalTemplates = jsonData.templates.length;
		var selectedTemplate = 0;

		for (var i = 0; i < totalTemplates; i++) {
			if (jsonData.templates[i].name == s) {
				selectedTemplate = i;
			}
		}
		getKeys(keys, jsonData.templates[selectedTemplate].content, '');
		for (var i = 0; i < keys.length; i++) {
			this[keys[i][0]] = jsonData.templates[selectedTemplate].content[keys[i][0]];

			changeInterface(keys[i][0], jsonData.templates[selectedTemplate].content[keys[i][0]]);

		}
	}
}

function changeInterface(k, v) {
	if (k != "numBass") {
		outlet(6, 'send', k);
		if (k.slice(-4) == "Size") {
			var c = 0;
			switch (v) {
				case 2:
					c = 1;
					break;
				case 4:
					c = 2;
					break;
				case 8:
					c = 3;
					break;
				case 16:
					c = 4;
					break;
				case 32:
					c = 5;
					break;
				case 64:
					c = 6;
					break;
			}
			outlet(6,"set", c);
		}
		else {
			outlet(6,"set", v);
		}
	}
}

function setfirstScene () {
	var __t = new LiveAPI("live_set view");
	var livesetTrack = new LiveAPI("live_set tracks 1");
	var allTracks = livesetTrack.get("clip_slots");

	var ss = 1;
	var l = ["id",Number(allTracks[(ss*2)-1])];
	__t.set("highlighted_clip_slot",l);
}