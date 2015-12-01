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

	selectedPack = pack;
	selectedStyle = style;
	var synth = "";
	var rselect = "";

	if (p != "Combo") {
		while (isInArray(synth, alreadySynths)) {
			if (pack == "all" || p == "FX" || p == "Shot") {
				selectedPack = packArray[randomInt(0, packArray.length - 1)];
			}
			if (style == "all") {
				selectedStyle = styleArray[randomInt(0, styleArray.length - 1)];
			}

			rselect = getSynth(s);
			synth = selectedPack + selectedStyle + rselect;
		}
	} else {
		synth = "dubCombo0"
	}

	log(synth);
	alreadySynths.push(synth);

	outlet(0, "swap " + synth);

	if (s == "Snare" || s == "Perc" || s == "Lead" || s == "Hats" || s == "FX" || s == "Shot" || s == "Vocal") {
		if (this[s.toLowerCase() + "Acid"] == true) {
			outlet(0, "loaddev Audio Effect Rack");
			outlet(0, "swap Acidlizer");
		}
	}
}

function loadNewSynth() {
	loadDefaults(selectedTypeNewSynth);
}
