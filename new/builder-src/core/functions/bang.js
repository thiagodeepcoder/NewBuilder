function bang() {
    api = new LiveAPI("this_device");
    liveView = new LiveAPI("live_app view");
    liveSetView = new LiveAPI("live_set view");
    liveSet = new LiveAPI("live_set");

    liveView.call("focus_view", "Session");

    if (channelSequence[countBangs] == "Loop") {
        createTTrack(channelSequence[countBangs]);
    } else {
        createTrack(channelSequence[countBangs]);
        loadDefaults(channelSequence[countBangs]);
    }

    trackView = new LiveAPI("live_set tracks " + Number(countBangs + 1) + " view");

    trackView.set("is_collapsed", "1");
    setCustomTrack(countBangs);

    createScene(25);
    //cria slices da estrutura
    if (!sCreated) {
        createStructure();
        sCreated = true;
    }

    if (channelSequence[countBangs] == "SC") {
        var muteT = new LiveAPI("live_set tracks 1");
        muteT.set("mute", "1");
    }
    
    createCSequence(channelSequence[countBangs]);
    createGroove(channelSequence[countBangs]);

    var nextFeeeMidi;

    for (var i = 0; i < channelSlices.length; i++) { // Sequencia de slices do canal
        for (var j = 0; j < channelSlices[i].steps / 16; j++) {
            nextFeeeMidi = getNextFreeSlot(countBangs + 1);
            if (channelSlices[i].steps % 16 == 0) {
                finalSteps = 16;
            } else if (channelSequence[countBangs] == "SC") {
                if (j == (channelSlices[i].steps / 16) - 1) {
                    finalSteps = channelSlices[i].steps % 16;
                } else {
                    finalSteps = 16;
                }
            } else {
                finalSteps = channelSlices[i].steps;
            }

            createClipCustom(countBangs + 1, nextFeeeMidi, finalSteps, channelSlices[i].seq, channelSequence[countBangs]);

            if (channelSlices[i].seq != "blank") {
                createNotes(countBangs + 1, nextFeeeMidi);
            }
        }
    }

    channelSlices = [];
    
    if (countBangs < channelSequence.length - 1) {
        //if (countBangs < 0) {
        countBangs++;
        bang();
    } else {
        sCreated = false;
        sSlicesArray = [];
    }

    setBuilderChannel();
    arrayOfNotes = []; 
}
