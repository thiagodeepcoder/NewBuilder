function createScene(ns) {
    var n = ns - ((liveSet.get("scenes").length) / 2);
    for (var m = 0; m < n; m++) {
        liveSet.call("create_scene", ((liveSet.get("scenes").length) / 2));
    }
}

function createTrack(name) {
    liveSet.call("create_midi_track", (liveSet.get("tracks").length / 2));
    setTrackName((liveSet.get("tracks").length / 2) - 1, name);
}

function createTTrack(name) {
    liveSet.call("create_audio_track", (liveSet.get("tracks").length / 2));
    setTrackName((liveSet.get("tracks").length / 2) - 1, name);
}

function createClipCustom(t, c, s, fill, name, plus) {
    setTrackClip(t, c);
    sceneSlot.call("create_clip", "" + s * 4);
    setSceneClip(t, c);
    if (plus) {
        sceneSlotClip.set("name", "New " + name);
    }
    var getcolor = getColor(name);
    if (fill == "blank") {
        setClipColor(t, c, [50, 50, 50]);
    } else {
        setClipColor(t, c, getcolor);
    }
}