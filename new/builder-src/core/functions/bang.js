function bang() {
    if (!buildFinish) {
        createScene(25);
        //cria slices da estrutura
        if (!sCreated) {
            createStructure();
            sCreated = true;
            setChannelSequence();
        }

        if (channelSequence[countBangs] == "SC") {
            var muteT = new LiveAPI("live_set tracks 1");
            muteT.set("mute", "1");
        }

        createMusic(channelSequence[countBangs]);

        if (countBangs < channelSequence.length - 1) {
            //if (countBangs < 1) {
            countBangs++;
            bang();
        } else {
            //sCreated = false;
            buildFinish = true;
            //sSlicesArray = [];
        }
    }
}

function createMusic(s) {
    // cria cada canal    
    singleChannel(s);
}
