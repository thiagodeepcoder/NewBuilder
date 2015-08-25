function loadDefaults(s) {
	outlet(0, "loaddev Simpler");
	if(s=="Kick cut") {
		loadDevice("EQ Eight", "LowCut");
	}
	else if(s=="FX" || s=="Perc") {
		loadDeviceU("Reverb");
	}
	else if(s=="Snare fixo" || s=="Tops fixo" || s=="Snare" || s=="Tops")
	{
		loadDeviceU("Reverb");
		loadDevice("EQ Eight", "LowCut");
	}
	else if(s=="Bass" || s=="Lowend") {
		loadDeviceU("Compressor");
	}
}

function loadDeviceU(d) {
    outlet(0, "loaddev " + d);
}

function loadDevice(p) {
    outlet(0, "loaddev Instrument Rack");
    var s;

    if ( p == "SC" || p == "Kick cut" ) {
    	s = "Kick";
    }
    else if(p == "Hats fixo") {
    	s = "Hats";
    }
    else if(p == "Snare fixo") {
    	s = "Snare";
    }
    else {
    	s = p;
    }
    var array = this[s.toLowerCase() + "Array"];
    var basenmae = this[s.toLowerCase() + "BaseName"];

    var synth = style + basenmae + randomInt(array[0],array[1]);
    log(synth);

    outlet(0, "swap " + synth);
}
function loadNewSynth() {
	loadDefaults(selectedTypeNewSynth);
}