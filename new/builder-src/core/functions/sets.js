function setTrackName(trackNumber, trackName) {
    var tracks = new LiveAPI("live_set tracks " + trackNumber);
    tracks.set("name", trackName);
}

function setCustomStructure(v) {
    cStructure = v;

    switch (cStructure) {
        case "Agressive":
            breaks = [8, 2];
            verses = [32, 3];
            sSlices = 9;
            break;
        case "Rhythmic":
            breaks = [8, 5];
            verses = [16, 5];
            sSlices = 17;
            break;
        case "Progressivo":
            breaks = [32, 2];
            verses = [32, 2];
            sSlices = 8;
            break;
        case "Linear":
            breaks = [16, 1];
            verses = [64, 3];
            sSlices = 6;
            break;
        case "Commun":
            breaks = [16, 3];
            verses = [32, 3];
            sSlices = 11;
            break;
        case "Experimental":
            breaks = [32, 2];
            verses = [32, 3];
            sSlices = 9;
            break;
    }
}

function setCustomBass(v) {
    cBass = v;
    numBass = cBass;
}

function setCustomSnares(v) {
    cSnares = notes2Channels(v);
    numSnares = cSnares;
}

function setCustomPercussion(v) {
    cPercs = v;
    numPercs = cPercs;
}

function setCustomHats(v) {
    cHats = notes2Channels(v);
    numHats = cHats;
}

function setCustomFX(v) {
    cFXs = notes2Channels(v);
    numFXs = cFXs;
}

function setCustomPad(v) {
    cPads = notes2Channels(v);
    numPads = cPads;

}

function setCustomLead(v) {
    cLeads = notes2Channels(v);
    numLeads = cLeads;
}

function setCustomVocals(v) {
    cVocals = notes2Channels(v);
    numLVocals = cVocals;
}

function setCBassG(v) {
    cgBass = v;
}

function setCSnaresG(v) {
    cgSnares = v;
}

function setCPercG(v) {
    cgPerc = v;
}

function setCHatsG(v) {
    cgHats = v;
}

function setCFXG(v) {
    cgFX = v;
}

function setCPadG(v) {
    cgPads = v;
}

function setCLeadsG(v) {
    cgLeads = v;
}

function setCVocalsG(v) {
    cgVocals = v;
}
function setTempSelect(v) {
    if (v != "Select") {
        var sc;
        var lastChar = v.substr(v.length - 1); // => 1
        for (var i = 0; i < totalDropDowns; i++) {
            sc = this["customTemp" + lastChar][i];
            outlet(4, sc);
            outlet(3, i);
        }
    }
}

function setCGroove(s) {


    switch (s) {
        case "Bass":
            cgSelected = tGroove(cgBass);
            break;
        case "Snare":
            cgSelected = tGroove(cgSnares);
            break;
        case "Perc":
            cgSelected = tGroove(cgPerc);
            break;
        case "Hats":
            cgSelected = tGroove(cgHats);
            break;
        case "FX":
            cgSelected = tGroove(cgFX);
            break;
        case "Pad":
            cgSelected = tGroove(cgPads);
            break;
        case "Lead":
            cgSelected = tGroove(cgLeads);
            break;
        case "Vocals":
            cgSelected = tGroove(cgVocals);
            break;
    }
}

function setTrackClip(t, m) {
    var path = "live_set tracks " + t + " clip_slots " + m;
    sceneSlot = new LiveAPI(path);
}

function setClipColor(t, m, rgb) {
    setSceneClip(t, m);
    var red = rgb[0];
    var green = rgb[1];
    var blue = rgb[2];
    sceneSlotClip.set("color", 65536 * red + 256 * green + blue);
}

function setSceneClip(t, m) {
    var path = "live_set tracks " + t + " clip_slots " + m + " clip";
    sceneSlotClip = new LiveAPI(path);
}

function setBuilderChannel() {
    setCustomTrack(0);
    selectedTrack.set("name", "Builder");
}

function setCustomTrack(t) {
    selectedTrack = new LiveAPI("live_set tracks " + t);
}

function setNote(note) {
    if (note.slice(1) == "#") {
        noteTrack = this["scale" + note.slice(0, 1) + "sharp"];
    } else {
        noteTrack = this["scale" + note.slice(0, 1)];
    }
}

function setIntro(v) {
    switch (v) {
        case "Enable":
            intro = true;
            break;
        case "Disable":
            intro = false;
            break;
        case "No Minibreak":
            introKickBass = false;
            break;
        case "With Minibreak":
            introKickBass = true;
            break;
        case "No Kick/Bass":
            introKickBass = false;
            break;
        case "With Kick/Bass":
            introKickBass = true;
            break;
        case "15s":
            introSize = 8;
            break;
        case "30s":
            introSize = 16;
            break;
        case "45s":
            introSize = 24;
            break;
        case "60s":
            introSize = 32;
            break;
    }
    if (isNumber(v)) {
        introPercent = v * 100;
    }
    setNumSlices();
}

function setOutro(v) {
    switch (v) {
        case "Enable":
            outro = true;
            break;
        case "Disable":
            outro = false;
            break;
        case "No Smooth":
            outroSmooth = false;
            break;
        case "With Smooth":
            outroSmooth = true;
            break;
        case "No Bass":
            outroBass = false;
            break;
        case "With Bass":
            outroBass = true;
            break;
        case "30s":
            outroSize = 16;
            break;
        case "45s":
            outroSize = 24;
            break;
        case "60s":
            outroSize = 32;
            break;
        case "90s":
            outroSize = 48;
            break;
        case "120s":
            outroSize = 64;
            break;
    }
    if (isNumber(v)) {
        outroPercent = v * 100;
    }
    setNumSlices();
}

function setVerses(v) {
    switch (v) {
        case "No Mini Break":
            verseMinibreak = false;
            break;
        case "With Mini Break":
            verseMiniBreak = true;
            break;
        case "No Long":
            verseLong = false;
            break;
        case "1 Long":
            verseLong = true;
            break;
        case "15s":
            verseSize = 8;
            break;
        case "30s":
            verseSize = 16;
            break;
        case "45s":
            verseSize = 24;
            break;
        case "60s":
            verseSize = 32;
            break;
    }
    if (isNumber(v)) {
        verseNum = v * 4;
    }
    setNumSlices();
}

function setBreaks(v) {
    switch (v) {
        case "No Long":
            breakLong = false;
            break;
        case "1 Long":
            breakLong = true;
            break;
        case "15s":
            breakSize = 8;
            break;
        case "30s":
            breakSize = 16;
            break;
        case "45s":
            breakSize = 24;
            break;
        case "60s":
            breakSize = 32;
            break;
    }
    if (isNumber(v)) {
        breakNum = v * 4;
    }
    setNumSlices();
}

function setKick(v) {
    switch (v) {
        case "No Kick cut":
            kickCut = false;
            break;
        case "With Kick cut":
            kickCut = true;
            break;
        case "No SC":
            kickSC = false;
            break;
        case "With SC":
            kickSC = true;
            break;
        case "2s":
            kickSize = 1;
            break;
        case "4s":
            kickSize = 2;
            break;
        case "8s":
            kickSize = 4;
            break;
        case "15s":
            kickSize = 8;
            break;
        case "30s":
            kickSize = 16;
            break;
    }
    if (isNumber(v)) {
        kickNotes = v * 8;
    }
    log(v);
}

function setBass(v) {
    switch (v) {
        case "No Low End":
            bassLowEnd = false;
            break;
        case "With Low End":
            bassLowEnd = true;
            break;
        case "Robotizer":
            bassHuman = false;
            break;
        case "Humanizer":
            bassHuman = true;
            break;
        case "Atonal":
            bassTone = false;
            break;
        case "Tones":
            bassTone = true;
        case "2s":
            bassSize = 1;
            break;
        case "4s":
            bassSize = 2;
            break;
        case "8s":
            bassSize = 4;
            break;
        case "15s":
            bassSize = 8;
            break;
        case "30s":
            bassSize = 16;
            break;
        case "60s":
            bassSize = 32;
            break;
    }
    if (isNumber(v)) {
        bassNotes = note2Num(1,16,v);
        log(bassNotes);
    }
}

function setSnare(v) {
    switch (v) {
        case "No Steady":
            snareSteady = false;
            break;
        case "With Steady":
            snareSteady = true;
            break;
        case "Robotizer":
            snareHuman = false;
            break;
        case "Humanizer":
            snareHuman = true;
            break;
        case "2s":
            snareSize = 1;
            break;
        case "4s":
            snareSize = 2;
            break;
        case "8s":
            snareSize = 4;
            break;
        case "15s":
            snareSize = 8;
            break;
        case "30s":
            snareSize = 16;
            break;
        case "60s":
            snareSize = 32;
            break;
    }
    if (isNumber(v)) {
        snareNotes = note2Num(1,8,v);
    }
}

function setHats(v) {
    switch (v) {
        case "No Steady":
            hatsSteady = false;
            break;
        case "With Steady":
            hatsSteady = true;
            break;
        case "Robotizer":
            hatsHuman = false;
            break;
        case "Humanizer":
            hatsHuman = true;
            break;
        case "2s":
            hatsSize = 1;
            break;
        case "4s":
            hatsSize = 2;
            break;
        case "8s":
            hatsSize = 4;
            break;
        case "15s":
            hatsSize = 8;
            break;
        case "30s":
            hatsSize = 16;
            break;
        case "60s":
            hatsSize = 32;
            break;
    }
    if (isNumber(v)) {
        hatsNotes = note2Num(1,8,v);
    }
}

function setFX(v) {
    switch (v) {
        case "Atonal":
            fxTone = false;
            break;
        case "Tones":
            fxTone = true;
            break;
        case "Robotizer":
            fxHuman = false;
            break;
        case "Humanizer":
            fxHuman = true;
            break;
        case "2s":
            fxSize = 1;
            break;
        case "4s":
            fxSize = 2;
            break;
        case "8s":
            fxSize = 4;
            break;
        case "15s":
            fxSize = 8;
            break;
        case "30s":
            fxSize = 16;
            break;
        case "60s":
            fxSize = 32;
            break;
    }
    if (isNumber(v)) {
        fxNotes = note2Num(1,8,v);
    }
    log(v);
}

function setPerc(v) {
    switch (v) {
        case "Robotizer":
            percHuman = false;
            break;
        case "Humanizer":
            percHuman = true;
            break;
        case "2s":
            percSize = 1;
            break;
        case "4s":
            percSize = 2;
            break;
        case "8s":
            percSize = 4;
            break;
        case "15s":
            percSize = 8;
            break;
        case "30s":
            percSize = 16;
            break;
    }
    if (isNumber(v)) {
        percNotes = note2Num(1,16,v);
    }
    log(v);
}

function setLead(v) {
    switch (v) {
        case "Atonal":
            leadTone = false;
            break;
        case "Tones":
            leadTone = true;
            break;
        case "Robotizer":
            leadHuman = false;
            break;
        case "Humanizer":
            leadHuman = true;
            break;
        case "2s":
            leadSize = 1;
            break;
        case "4s":
            leadSize = 2;
            break;
        case "8s":
            leadSize = 4;
            break;
        case "15s":
            leadSize = 8;
            break;
        case "30s":
            leadSize = 16;
            break;
    }
    if (isNumber(v)) {
        leadNotes = note2Num(1,16,v);
    }
    log(v);
}

function setVocal(v) {
    switch (v) {
        case "Atonal":
            vocalTone = false;
            break;
        case "Tones":
            vocalTone = true;
            break;
        case "Robotizer":
            vocalHuman = false;
            break;
        case "Humanizer":
            vocalHuman = true;
            break;
        case "2s":
            vocalSize = 1;
            break;
        case "4s":
            vocalSize = 2;
            break;
        case "8s":
            vocalSize = 4;
            break;
        case "15s":
            vocalSize = 8;
            break;
        case "30s":
            vocalSize = 16;
            break;
    }
    if (isNumber(v)) {
        vocalNotes = note2Num(1,16,v);
    }
    log(v);
}

function setChannelLoadSynth (s) {
    selectedTypeNewSynth = s;
    log(selectedTypeNewSynth);
}

function setNumSlices() {
    var i = 0;
    var o = 0;
    if(intro) { i = 1; }
    if(outro) { o = 1; }
    sSlices = i + verseNum + breakNum + o;
    log(i, verseNum, breakNum,o, sSlices);
}

function setChannelSequence() {
    var i;
    if(kickSC) { channelSequence.push("SC"); }
    channelSequence.push("Kick");
    if(kickCut) { channelSequence.push("Kick cut"); }
    channelSequence.push("Bass");
    if(bassLowEnd) { channelSequence.push("Lowend"); }
    if(snareSteady) { channelSequence.push("Snare fixo"); }
    for(i=0;i<numSnares;i++)
    {
        channelSequence.push("Snare");
    }
    if(hatsSteady) { channelSequence.push("Hats fixo"); }
    for(i=0;i<numHats;i++)
    {
        channelSequence.push("Hats");
    }
    for(i=0;i<numPercs;i++)
    {
        channelSequence.push("Perc");
    }
    for(i=0;i<numFX;i++)
    {
        channelSequence.push("FX");
    }
    for(i=0;i<numLead;i++)
    {
        channelSequence.push("Lead");
    }
    for(i=0;i<numVocal;i++)
    {
        channelSequence.push("Vocals");
    }
    for(i=0;i<numPads;i++)
    {
        channelSequence.push("Pad");
    }
}

