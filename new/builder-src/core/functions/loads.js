function loadDefaults(s) {
	outlet(0, "loaddev Simpler");
	log("Simpler");
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
	else if(s=="Bass") {
		loadDeviceU("Compressor");
	}
}

function loadDeviceU(d) {
    outlet(0, "loaddev " + d);
}

function loadDevice(d, p) {
    outlet(0, "loaddev " + d);
    outlet(0, "swap " + p);
}