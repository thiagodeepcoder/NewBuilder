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
		if (!channelSeqCreated) {
			setChannelSequence();
		}

		createMusic(channelSequence[countBangs]);

		if (countBangs < channelSequence.length - 1) {
			//if (countBangs < 1) {
			countBangs++;
			bang();
		} else {
			//sCreated = false;
			buildFinish = true;
			countBangs = 0;
			alreadySynths = [];

			var muteT = new LiveAPI("live_set tracks 1");
			muteT.set("mute", "1");

			var builderT = new LiveAPI("live_set tracks 0 view");
			builderT.set("is_collapsed", "1");


			setfirstScene();
			//sSlicesArray = [];
		}
	}
}

function createMusic(s) {
	// cria cada canal    
	singleChannel(s);
}
