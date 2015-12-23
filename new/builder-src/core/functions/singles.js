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