function singleMidi(s) {
    if (!sCreated) {
        api = new LiveAPI("this_device");
        liveView = new LiveAPI("live_app view");
        liveSetView = new LiveAPI("live_set view");
        liveSet = new LiveAPI("live_set");

        liveView.call("focus_view", "Session");

        var nextFeeeMidi = getNextFreeSlot(0);
        createGroove(s);
        createClipCustom(0, nextFeeeMidi, 16, "filled", s, true);
        createNotes(0, nextFeeeMidi);

        resetBang();
    }
}
api = new LiveAPI("this_device");
liveView = new LiveAPI("live_app view");
liveSetView = new LiveAPI("live_set view");
liveSet = new LiveAPI("live_set");

function singleChannel(s) {
    if (!sCreated) {
        if (s == "Kick" && kickSC) {
            channelBang("SC");
        }

        if (s == "Kick" && kickCut) {
            channelBang("Kick cut");
        }

        channelBang(s);

        if (s == "Bass" && bassLowEnd) {
        	channelBang("Lowend");
        }
    }
}

function channelBang(s) {

    liveView.call("focus_view", "Session");

    createStructure(); //---------------------------------------  retirar
    var nextTrack = getTotalChannels();
    setCustomTrack(nextTrack); // seta a selectedTrack
    createTrack(s); // cria um novo channel

    createCSequence(s); // cria sequencia do canal de midi timeline
    createGroove(s); //cria groove

    //loadDefaults(nextTrack);
    var nextFeeeMidi;

    for (var i = 0; i < channelSlices.length; i++) { // Sequencia de slices do canal
        for (var j = 0; j < channelSlices[i].steps / 16; j++) {
            nextFeeeMidi = getNextFreeSlot(nextTrack);
            if (channelSlices[i].steps % 16 == 0) {
                finalSteps = 16;
            } else if (s == "SC") {
                if (j == (channelSlices[i].steps / 16) - 1) {
                    finalSteps = channelSlices[i].steps % 16;
                } else {
                    finalSteps = 16;
                }
            } else {
                finalSteps = channelSlices[i].steps;
            }

            createClipCustom(nextTrack, nextFeeeMidi, finalSteps, channelSlices[i].seq, sSlicesArray[i].slice, true); //sSlicesArray[i].slice

            if (channelSlices[i].seq != "blank") {
                createNotes(nextTrack, nextFeeeMidi);
            }
        }
    }

    setBuilderChannel();
    resetBang();

}
