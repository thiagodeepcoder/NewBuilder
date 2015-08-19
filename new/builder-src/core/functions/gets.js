function getColor(name) {
    var fcolor;
    switch (name) {
        case "SC":
            fcolor = [255, 255, 255];
            break;

        case "Kick":
            fcolor = [255, 255, 255];
            break;

        case "Kick cut":
            fcolor = [255, 255, 255];
            break;

        case "Bass":
            fcolor = [255, 0, 0];
            break;

        case "Snare":
            fcolor = [255, 190, 0];
            break;

        case "Snare fixo":
            fcolor = [255, 190, 0];
            break;

        case "Hats":
            fcolor = [255, 255, 0];
            break;

        case "Tops fixo":
            fcolor = [255, 255, 0];
            break;

        case "Perc":
            fcolor = [120, 200, 0]
            break;

        case "FX":
            fcolor = [80, 200, 180];
            break;

        case "Pad":
            fcolor = [200, 170, 80];
            break;

        case "Lead":
            fcolor = [200, 70, 30]
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
