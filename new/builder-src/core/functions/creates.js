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

function createStructure() {
    var rand;
    var vCounter = 0;
    var bCounter = 0;
    for (var i = 0; i < sSlices; i++) {
        //entra no Intro
        if (i == 0) {
            rand = 16 * (randomInt(1, 2));
            sSlicesArray.push({
                slice: "intro",
                steps: rand
            });
            if (randomInt(0, 1) == 1) {
                sSlicesArray.push({
                    slice: "break",
                    steps: 8
                });
                sSlicesArray.push({
                    slice: "drop",
                    steps: 16
                });
            }
        }
        //entra no verso
        else if (i == 1) {
            chanceOfBreak();
        } else if (i > 1 && i < sSlices - 1) {
            if (vCounter < verses[1] - 1 || bCounter < breaks[1]) {
                var randin = randomInt(0, 1);
                if (randin == 0) { // 0 escolhe break
                    if (bCounter < breaks[1]) // check se tem breaks avaliable
                    {
                        sSlicesArray.push({
                            slice: "break",
                            steps: breaks[0]
                        });
                        sSlicesArray.push({
                            slice: "drop",
                            steps: 16
                        });
                        bCounter++;
                    } else {
                        chanceOfBreak();
                        vCounter++;
                    }

                } else if (randin == 1) { // 1 escolhe verso
                    if (vCounter < verses[1] - 1) // check se tem verses avaliable
                    {
                        chanceOfBreak();
                        vCounter++;
                    } else {
                        sSlicesArray.push({
                            slice: "break",
                            steps: breaks[0]
                        });
                        sSlicesArray.push({
                            slice: "drop",
                            steps: 16
                        });
                        bCounter++;
                    }
                }
            }
        } else if (i == sSlices - 1) { // último
            rand = 16 + (16 * randomInt(1, 3));
            sSlicesArray.push({
                slice: "outro",
                steps: rand
            });
        }
    }
}

function createGroove(instrument) {
    newGroove = [];
    var channelGroove = instrument;
    var numberNotes;

    setCGroove(channelGroove);

    if (channelGroove == "Kick" || channelGroove == "Kick cut" || channelGroove == "SC") {
        numberNotes = 64;
        for (var i = 0; i < numberNotes; i++) {
            newGroove.push({
                note: 60,
                init: i,
                size: 1
            });
        }
    } else if (channelGroove == "Snare fixo") {
        numberNotes = 32;
        for (var i = 0; i < numberNotes; i++) {
            if (i == 0) {
                newGroove.push({
                    note: 60,
                    init: 1,
                    size: 1
                });
            } else {
                newGroove.push({
                    note: 60,
                    init: i + (i + 1),
                    size: 1
                });
            }

        }
    } else if (channelGroove == "Perc") {
        
        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);
            newGroove.push({ note: 60, init: randInit/4,size: 1});
        }
    } else if (channelGroove == "Snare") {
        
        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);

            newGroove.push({ note: 60, init: randInit/4,size: 1});
        }
    } else if (channelGroove == "Hats fixo") {
        numberNotes = 64;
        for (var i = 0; i < numberNotes; i++) {
            newGroove.push({
                note: 60,
                init: i + 0.5,
                size: 1
            });
        }
    } else if (channelGroove == "Hats") {

        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 246);
            if((randInit/4) % 1 != 0) {
                randInit = (randInit/4) + 0.25;
            }
            else {
                randInit = (randInit/4);
            }
            newGroove.push({ note: 60, init: randInit,size: 1});
        }
    } else if (channelGroove == "FX") {

        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);
            newGroove.push({ note: 60, init: randInit/4,size: 1});
        }
    } else if (channelGroove == "Pad") {

        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);
            newGroove.push({ note: randomInt(60, 72), init: randInit/4,size: 4});
        }
    } else if (channelGroove == "Lead") {
        log(cgSelected);
        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);
            newGroove.push({ note: randomInt(60, 72), init: randInit/4,size: 1});
        }
    } else if (channelGroove == "Bass") {

        // máximo é 4 tempos da midi
        // maximo de notas é 16 por tempo

        /*

            Shortest = 7 notas || 1 Tempo
            Short = 5 notas || 1 Tempo
            Long = 8 notas || 2 tempos
            Longest = 6 notas || 2 tempos
            Sparce = 5  notas || 2 tempos 
            Broken = 6 notes || 1 tempo
    
        */


        //numberNotes = cgSelected;

        var nnNotes;
        var quanNotes;
        switch (cgSelected) {
        case 1:
            nnNotes = 7;
            quanNotes = 16;
            break;
        case 2:
            nnNotes = 5;
            quanNotes = 16;
            break;
        case 4:
            nnNotes = 12;
            quanNotes = 32;
            break;
        case 8:
            nnNotes = 10;
            quanNotes = 32;
            break;
        case 16:
            nnNotes = 8;
            quanNotes = 32;
            break;
        case 5:
            nnNotes = 6;
            quanNotes = 16;
            break;
        }

        var randInit;
        var customNotes = [];
        for (var j = 0; j < 256/quanNotes; j++) { // 256/quanNotes
            if(j==0) {
                for (var i = 0; i <  nnNotes ; i++) {
                    randInit = randomInt(1, quanNotes * ( 1 + j ));
                    while(isInArray(randInit,arrayOfNotes) || randInit % 4 == 0) {
                        randInit = randomInt(1, quanNotes * ( 1 + j ));
                    }
                    arrayOfNotes.push(randInit);
                    newGroove.push({ note: 60, init: randInit/4,size: 0.5});
                }
            }
            else {
                for (var i = 0; i <  nnNotes ; i++) {
                    newGroove.push({ note: 60, init: (arrayOfNotes[i]/4)+((j*quanNotes)/4),size: 0.5});
                }
            }
        };

    }
}
function createCSequence(s) {
    if (s == "SC") {
        var tst = 0;
        for (var i = 0; i < sSlicesArray.length; i++) {
            tst += sSlicesArray[i].steps;
        }
        //var gnc = getNameC("SC");
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];
        channelSlices.push({
            seq: "filled",
            steps: tst
        });
    } else if (s == "Kick") {
       // var gnc = getNameC(s);
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];

        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            } else if (sSlicesArray[i].slice == "intro"|| sSlicesArray[i].slice == "outro") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            }
            else {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Kick cut") {
        //var gnc = getNameC("Kick");
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];

        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Bass") {
        //var gnc = getNameC(s);
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];

        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break") {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            } else {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Snare") {
        //var gnc = getNameC(s);
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else if (sSlicesArray[i].slice == "intro"|| sSlicesArray[i].slice == "outro") {
                if (randomInt(0, 2) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Snare fixo") {
        //var gnc = getNameC(s);
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Hats" || s=="Hats fixo") {
        //var gnc = getNameC(s);
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];

        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else if (sSlicesArray[i].slice == "intro"|| sSlicesArray[i].slice == "outro") {
                if (randomInt(0, 2) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else if (sSlicesArray[i].slice == "verso") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else // todos os drops
            {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Perc" || s == "FX" || s == "Lead") {
       // var gnc = getNameC(s);
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else if (sSlicesArray[i].slice == "intro"|| sSlicesArray[i].slice == "outro") {
                if (randomInt(0, 2) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else if (sSlicesArray[i].slice == "verso") {
                if (randomInt(0, 1) == 1) {
                    channelSlices.push({
                        seq: "filled",
                        steps: sSlicesArray[i].steps
                    });
                } else {
                    channelSlices.push({
                        seq: "blank",
                        steps: sSlicesArray[i].steps
                    });
                }
            } else // todos os drops
            {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Pad") {
       // var gnc = getNameC(s);
       // var getSeq = gnc[randomInt(0, gnc.length - 1)];
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            } else {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    }
}

function createClipCustom(t, c, s, fill, name, plus) {
    setTrackClip(t, c);
    sceneSlot.call("create_clip", "" + s * 4);
    setSceneClip(t,c);
    if(plus) { sceneSlotClip.set("name","New " + name); }
    var getcolor = getColor(name);
    if(fill == "blank")
    {
        setClipColor(t, c, [50,50,50]);
    }
    else
    {

        setClipColor(t, c, getcolor);
    }
    
}