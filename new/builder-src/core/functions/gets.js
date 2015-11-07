function getColor(name) {
	var fcolor;
	switch (name) {
		case "SC":
			fcolor = [123, 123, 123];
			break;

		case "Kick":
			fcolor = [255, 0, 0];
			break;

		case "Kick cut":
			fcolor = [243, 58, 23];
			break;

		case "Bass":
			fcolor = [255, 163, 29];
			break;

		case "Lowend":
			fcolor = [255, 161, 113];
			break;

		case "Snare":
			fcolor = [255, 238, 158];
			break;

		case "Snare fixo":
			fcolor = [255, 240, 47];
			break;

		case "Hats":
			fcolor = [212, 229, 152];
			break;

		case "Hats fixo":
			fcolor = [182, 209, 115];
			break;

		case "Perc":
			fcolor = [203, 242, 249]
			break;

		case "FX":
			fcolor = [0, 165, 239];
			break;

		case "Combo":
			fcolor = [0, 165, 239];
			break;

		case "Shot":
			fcolor = [83, 160, 49];
			break;

		case "Pad":
			fcolor = [130, 107, 229];
			break;

		case "Loop":
			fcolor = [255, 44, 211];
			break;
		case "Lead":
			fcolor = [255, 255, 255];
			break;

		case "Vocals":
			fcolor = [255, 145, 165];
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
