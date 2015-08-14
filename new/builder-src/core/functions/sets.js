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
    switch (cBass) {
        case 1:
            numBass = 1;
            break;
        case 2:
            numBass = 2;
            break;
        case 3:
            numBass = 3;
            break;
        case 4:
            numBass = 4;
            break;
        case 5:
            numBass = 5;
            break;
    }

    addToChannelStructure(numBass, "Bass");
    
}

function setCustomSnares(v) {
    cSnares = v;
    switch (cSnares) {
        case 1:
            numSnares = 1;
            break;
        case 2:
            numSnares = 2;
            break;
        case 3:
            numSnares = 3;
            break;
        case 4:
            numSnares = 4;
            break;
        case 5:
            numSnares = 5;
            break;
    }

    addToChannelStructure(numSnares, "Snare");
}

function setCustomPercussion(v) {
    cPercs = v;
    numPercs = cPercs;

    addToChannelStructure(numPercs, "Perc");
}

function setCustomTops(v) {
    cTops = v;
    switch (cTops) {
        case 1:
            numTops = 1;
            break;
        case 2:
            numTops = 2;
            break;
        case 3:
            numTops = 3;
            break;
        case 4:
            numTops = 4;
            break;
        case 5:
            numTops = 5;
            break;
    }
    addToChannelStructure(numTops, "Tops");

}

function setCustomFX(v) {
    cFXs = v;
    switch (cFXs) {
        case 1:
            numFXs = 1;
            break;
        case 2:
            numFXs = 2;
            break;
        case 3:
            numFXs = 3;
            break;
        case 4:
            numFXs = 4;
            break;
        case 5:
            numFXs = 5;
            break;
    }
    addToChannelStructure(numFXs, "FX");
}

function setCustomPads(v) {
    cPads = v;
    switch (cPads) {
        case 1:
            numPads = 1;
            break;
        case 2:
            numPads = 2;
            break;
        case 3:
            numPads = 3;
            break;
        case 4:
            numPads = 4;
            break;
        case 5:
            numPads = 5;
            break;
    }
    addToChannelStructure(numPads, "Pad");

}

function setCustomLeads(v) {
    cLeads = v;
    switch (cLeads) {
        case 1:
            numLeads = 1;
            break;
        case 2:
            numLeads = 2;
            break;
        case 3:
            numLeads = 3;
            break;
        case 4:
            numLeads = 4;
            break;
        case 5:
            numLeads = 5;
            break;
    }
    addToChannelStructure(numLeads, "Lead");
}

function setCustomLoops(v) {
    cLoops = v;
    switch (cLoops) {
        case 1:
            numLoops = 1;
            break;
        case 2:
            numLoops = 2;
            break;
        case 3:
            numLoops = 3;
            break;
        case 4:
            numLoops = 4;
            break;
        case 5:
            numLoops = 5;
            break;
    }
    addToChannelStructure(numLoops, "Loop");
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

function setCTopsG(v) {
    cgTops = v;
}

function setCFXG(v) {
    cgFX = v;
}

function setCPadsG(v) {
    cgPads = v;
}

function setCLeadsG(v) {
    cgLeads = v;
}

function setTempSelect(v) {
    if (v!="Select") {
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
            log("cgperc",tGroove(cgPerc));
            break;
        case "Tops":
            cgSelected = tGroove(cgTops);
            break;
        case "FX":
            cgSelected = tGroove(cgFX);
            break;
        case "Pads":
            cgSelected = tGroove(cgPads);
            break;
        case "Leads":
            cgSelected = tGroove(cgLeads);
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

function setIntroKickBass (v) {
    if(v=="Enable") { introKickBass = true; }
    else { introKickBass = false; }
}