function setTemplate(s) {
    if (s == "Broken") {
        intro = true;
        introSize = 32;
        introPercent = 20;

        outro = true;
        outroSize = 48;
        outroPercent = 25;

        verseMiniBreak = true;
        verseSize = 16;
        verseNum = 3;

        breakLong = true;
        breakSize = 16;
        breakNum = 2;
        dropSize = 16;

        kickCut = true;
        kickSC = true;
        kickNotes = 1;
        kickSize = 16;

        bassLowEnd = true;
        bassSize = 8;
        bassNotes = 6;

        snareSteady = true;
        snareHuman = true;
        snareSize = 16;
        snareNotes = 2;

        hatsSteady = true;
        hatsSize = 16;
        hatsNotes = 2;

        fxTone = true;
        fxHuman = true;
        fxSize = 16;
        fxNotes = 2;

        percSize = 16;
        percNotes = 2;

        leadSize = 16;
        leadNotes = 3;

        vocalSize = 16;
        vocalNotes = 2;

        numBass = 1;
        numSnares = 0;
        numPercs = 2;
        numHats = 2;
        numFXs = 3;
        numPads = 1;
        numLeads = 1;
        numVocals = 1;
    } else if (s == "Strange") {
        intro = true;
        introSize = 16;
        introPercent = 40;

        outro = true;
        outroSize = 48;
        outroPercent = 45;

        verseMiniBreak = true;
        verseSize = 16;
        verseNum = 4;

        breakLong = true;
        breakSize = 8;
        breakNum = 3;
        dropSize = 8;

        kickSC = true;
        kickNotes = 1;
        kickSize = 16;

        bassLowEnd = true;
        bassSize = 16;
        bassNotes = 10;

        snareSteady = true;
        snareHuman = true;
        snareSize = 16;
        snareNotes = 2;

        hatsSteady = true;
        hatsSize = 16;
        hatsNotes = 4;

        fxTone = true;
        fxHuman = true;
        fxSize = 16;
        fxNotes = 3;

        percSize = 16;
        percNotes = 1;

        leadSize = 16;
        leadNotes = 2;

        vocalSize = 16;
        vocalNotes = 1;

        numBass = 1;
        numSnares = 1;
        numPercs = 3;
        numHats = 3;
        numFXs = 5;
        numPads = 1;
        numLeads = 1;
        numVocals = 1;
    }

    setMeter();
    setTotalTime();
    setNumSlices();
}
