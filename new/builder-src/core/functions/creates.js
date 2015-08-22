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
    var kbMinibreak = 0;
    for (var i = 0; i < sSlices; i++) {
        //entra no Intro
        if (i == 0 && intro == true) {
            rand = introSize;
            if (introMiniBreak) {
                kbMinibreak = 4;
            }
            sSlicesArray.push({
                slice: "intro",
                steps: rand - kbMinibreak
            });
            if (introMiniBreak) {
                sSlicesArray.push({
                    slice: "break",
                    steps: 4
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
            vCounter++;
        } else if (i > 1 && i < sSlices - 1) {
            if (vCounter < verseNum || bCounter < breakNum) {
                var randin = randomInt(0, 1);
                if (randin == 0) { // 0 escolhe break
                    if (bCounter < breakNum) // check se tem breaks avaliable
                    {
                        sSlicesArray.push({
                            slice: "break",
                            steps: breakSize
                        });
                        if (breakLong) {
                            sSlicesArray.push({
                                slice: "break",
                                steps: breakSize
                            });
                            breakLong = false;
                        }
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
                    if (vCounter < verseNum) // check se tem verses avaliable
                    {
                        chanceOfBreak();
                        vCounter++;
                    } else {
                        sSlicesArray.push({
                            slice: "break",
                            steps: breakSize
                        });
                        sSlicesArray.push({
                            slice: "drop",
                            steps: 16
                        });
                        bCounter++;
                    }
                }
            }
        } else if (i == sSlices - 1 && outro == true) { // último
            rand = outroSize;
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
        if (kickGrooveNotes == '') {
            numberNotes = 64;
            var kickC = 0;
            for (var i = 0; i < numberNotes; i++) {
                newGroove.push({
                    note: 60,
                    init: i,
                    size: 1
                });
            }
            if (kickC < kickNotes) {
                var randInit;
                for (var i = 0; i < kickNotes; i++) {

                    randInit = randomInt(0, kickSize * 8);

                    while (isInArray(randInit, arrayOfNotes) || isOdd(randInit) == 0) {
                        randInit = randomInt(0, kickSize * 8);
                    }
                    arrayOfNotes.push(randInit);
                    newGroove.push({
                        note: 60,
                        init: randInit / 2,
                        size: 0.25
                    });
                }
                kickC++;
            }
            kickGrooveNotes = newGroove;
        } else {
            newGroove = kickGrooveNotes;
        }
        kickGrooveNotes = [];
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

        var randInit;
        var human = 0;
        for (var j = 0; j < 16 / percSize; j++) {
            if (j == 0) {
                for (var i = 0; i < percNotes; i++) {
                    if (percHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(0, percSize * 16) + human;
                    arrayOfNotes.push(randInit);
                    newGroove.push({
                        note: 60,
                        init: randInit / 4,
                        size: 1
                    });
                }
            } else {
                for (var i = 0; i < percNotes; i++) {
                    newGroove.push({
                        note: 60,
                        init: ((arrayOfNotes[i]) / 4) + ((j * percSize * 4)),
                        size: 1
                    });
                }
                log((j * hatsSize));
            }
        }
    } else if (channelGroove == "Snare") {
        var randInit;
        var human = 0;
        for (var j = 0; j < 16 / snareSize; j++) {
            if (j == 0) {
                for (var i = 0; i < snareNotes; i++) {
                    if (snareHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(0, snareSize * 16) + human;
                    arrayOfNotes.push(randInit);
                    newGroove.push({
                        note: 60,
                        init: randInit / 4,
                        size: 1
                    });
                }
            } else {
                for (var i = 0; i < snareNotes; i++) {
                    newGroove.push({
                        note: 60,
                        init: ((arrayOfNotes[i]) / 4) + ((j * snareSize * 4)),
                        size: 1
                    });
                }
                log((j * snareSize));
            }
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

        var randInit;
        var human = 0;
        for (var j = 0; j < 16 / hatsSize; j++) {
            if (j == 0) {
                for (var i = 0; i < hatsNotes; i++) {
                    if (hatsHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(0, hatsSize * 16) + human;
                    arrayOfNotes.push(randInit);
                    newGroove.push({
                        note: 60,
                        init: randInit / 4,
                        size: 1
                    });
                }
            } else {
                for (var i = 0; i < hatsNotes; i++) {
                    newGroove.push({
                        note: 60,
                        init: ((arrayOfNotes[i]) / 4) + ((j * hatsSize * 4)),
                        size: 1
                    });
                }
                log((j * hatsSize));
            }
        }
    } else if (channelGroove == "FX") {

        numberNotes = cgSelected;
        var randInit;
        var human = 0;
        var toneFX = 0;
        var toneArray = [];
        for (var j = 0; j < 16 / fxSize; j++) {
            if (j == 0) {
                for (var i = 0; i < fxNotes; i++) {
                    if (fxHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(0, fxSize * 16) + human;

                    if (fxTone) {
                        toneFX = randomInt(57, 63);
                    } else {
                        toneFX = 60;
                    }
                    toneArray.push(toneFX);
                    arrayOfNotes.push(randInit);
                    newGroove.push({
                        note: toneFX,
                        init: randInit / 4,
                        size: 1
                    });
                }
            } else {
                for (var i = 0; i < fxNotes; i++) {
                    newGroove.push({
                        note: toneArray[i],
                        init: ((arrayOfNotes[i]) / 4) + ((j * fxSize * 4)),
                        size: 1
                    });
                }
            }
        }
    } else if (channelGroove == "Pad") {

        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);
            newGroove.push({
                note: randomInt(60, 72),
                init: randInit / 4,
                size: 4
            });
        }
    } else if (channelGroove == "Lead") {
        var randInit;
        var human = 0;
        var toneLead = 0;
        var toneArray = [];
        var human = 0;
        for (var j = 0; j < 16 / leadSize; j++) { // 256/quanNotes
            if (j == 0) { // cria sequencia base a ser duplicada
                for (var i = 0; i < leadNotes; i++) {
                    if (leadHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(0, leadSize * 16) + human;
                    while (isInArray(randInit, arrayOfNotes)) {
                        randInit = randomInt(0, leadSize * 16) + human;
                    }

                    arrayOfNotes.push(randInit);

                    if (leadTone) {
                        toneLead = randomInt(57, 67);
                    } else {
                        toneLead = 60;
                    }

                    toneArray.push(toneLead);
                    newGroove.push({
                        note: toneLead,
                        init: randInit / 4,
                        size: 0.5
                    });
                }
            } else { // duplica sequencia até atingir 64
                for (var i = 0; i < leadNotes; i++) {
                    newGroove.push({
                        note: toneArray[i],
                        init: (arrayOfNotes[i] / 4) + ((j * leadSize) * 4),
                        size: 0.5
                    });
                }
            }
        }
    } else if (channelGroove == "Vocals") {
        var randInit;
        var human = 0;
        var toneVocal = 0;
        var toneArray = [];
        for (var j = 0; j < 16 / vocalSize; j++) {
            if (j == 0) { // cria sequencia base a ser duplicada
                for (var i = 0; i < vocalNotes; i++) {
                    if (vocalHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(0, vocalSize * 16) + human;

                    if (vocalTone) {
                        toneVocal = randomInt(57, 67);
                    } else {
                        toneVocal = 60;
                    }
                    log(toneVocal);
                    toneArray.push(toneVocal);
                    arrayOfNotes.push(randInit);
                    newGroove.push({
                        note: toneVocal,
                        init: randInit / 4,
                        size: 1
                    });
                }
            } else { // duplica sequencia até atingir 64
                for (var i = 0; i < vocalNotes; i++) {
                    newGroove.push({
                        note: toneArray[i],
                        init: (arrayOfNotes[i] / 4) + ((j * vocalSize) * 4),
                        size: 1
                    });
                }
            }
        }
    } else if (channelGroove == "Lowend") {
        log(newGroove);
        numberNotes = cgSelected;
        var randInit = 16;
        for (var i = 0; i < randInit; i++) {
            newGroove.push({
                note: 60,
                init: i * 4,
                size: 4
            });
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

        var nnNotes = 7;
        var quanNotes = 16;
        /*switch (cgSelected) {
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
        }*/

        populateMidi("bass");
        /*nnNotes = bassNotes;
        quanNotes = bassSize;
        var randInit;
        var toneBass = 0;
        var toneArray = [];
        var human = 0;
        for (var j = 0; j < 256 / quanNotes; j++) { // 256/quanNotes
            if (j == 0) { // cria sequencia base a ser duplicada
                for (var i = 0; i < nnNotes; i++) {
                    if (bassHuman) {
                        human = randomInt(1, 4) / 8;
                    } else {
                        human = 0;
                    }
                    randInit = randomInt(1, quanNotes * (1 + j)) + human;
                    while (isInArray(randInit, arrayOfNotes) || (randInit) % 4 < 0 && (randInit) % 4 > 1) {
                        randInit = randomInt(1, quanNotes * (1 + j)) + human;
                    }

                    arrayOfNotes.push(randInit);

                    if (bassTone) {
                        toneBass = randomInt(57, 63);
                    } else {
                        toneBass = 60;
                    }

                    toneArray.push(toneBass);
                    newGroove.push({
                        note: toneBass,
                        init: randInit / 4,
                        size: 0.5
                    });
                }
            } else { // duplica sequencia até atingir 64
                for (var i = 0; i < nnNotes; i++) {
                    newGroove.push({
                        note: toneArray[i],
                        init: (arrayOfNotes[i] / 4) + ((j * quanNotes) / 4),
                        size: 0.5
                    });
                }
            }
        };*/

    }
}

function populateMidi(s) {
    var randInit;
    var tone = 0;
    var toneArray = [];
    var variation = 0;

    var size = eval(s + "Size");
    var human;
    var notes = eval(s + "Notes");
    var iTone;

    if (s == "bass" || s == "lead" || s == "vocal" || s == "fx") {
        human = eval(s + "Human");
    }
    if (s == "bass" || s == "lead" || s == "vocal" || s == "fx") {
        iTone = eval(s + "Tone");
    }


    for (var j = 0; j < 256 / size; j++) { // 256/quanNotes
        if (j == 0) { // cria sequencia base a ser duplicada
            for (var i = 0; i < notes; i++) {
                if (human == 1) {
                    variation = randomInt(1, 4) / 8;
                } else {
                    variation = 0;
                }

                do {
                    randInit = randomInt(1, size * 4);
                }
                while (isInArray(randInit, arrayOfNotes));


                if (randInit % 4 == 0 && s == "bass" && s == "snare" && s == "perc" && s == "hats") {
                    randInit++;
                }
                arrayOfNotes.push(randInit);

                if (iTone) {
                    tone = randomInt(58, 62);
                } else {
                    tone = 60;
                }
                log(randInit);
                toneArray.push(tone);
                newGroove.push({
                    note: tone,
                    init: (randInit + variation) / 4,
                    size: 0.5
                });
            }
        } else { // duplica sequencia até atingir 64
            for (var i = 0; i < notes; i++) {
                newGroove.push({
                    note: toneArray[i],
                    init: ((arrayOfNotes[i] + variation) / 4) + ((j * size * 4) / 4),
                    size: 0.5
                });
            }
        }
    };
}

function createCSequence(s) {
    if (s == "SC") {
        var tst = 0;
        for (var i = 0; i < sSlicesArray.length; i++) {
            tst += sSlicesArray[i].steps;
        }
        channelSlices.push({
            seq: "filled",
            steps: tst
        });
    } else if (s == "Kick") {
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            } else if (sSlicesArray[i].slice == "intro") {
                if (introKickBass) {
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
            } else if (sSlicesArray[i].slice == "outro") {
                if (!outroSmooth) {
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
    } else if (s == "Kick cut") {
        //var gnc = getNameC("Kick");
        //var getSeq = gnc[randomInt(0, gnc.length - 1)];

        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                if (randomInt(0, 3) == 1) {
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
            } else if (sSlicesArray[i].slice == "intro") {
                if (introKickBass) {
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
            } else if (sSlicesArray[i].slice == "outro") {
                if (outroSmooth) {
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
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            } else if (sSlicesArray[i].slice == "intro") {
                if (introKickBass) {
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
            } else if (sSlicesArray[i].slice == "outro") {
                if (!outroSmooth) {
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
    } else if (s == "Lowend") {
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
                channelSlices.push({
                    seq: "blank",
                    steps: sSlicesArray[i].steps
                });
            } else if (sSlicesArray[i].slice == "outro") {
                if (!outroSmooth) {
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
    } else if (s == "Snare") {
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak" || sSlicesArray[i].slice == "drop") {
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
            } else if (sSlicesArray[i].slice == "outro") {
                if (randomInt(0, 3) == 1) {
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
            } else if (sSlicesArray[i].slice == "intro") {
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
    } else if (s == "Hats") {
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
            } else if (sSlicesArray[i].slice == "intro" || sSlicesArray[i].slice == "outro") {
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
    } else if (s == "Hats fixo") {
        for (var i = 0; i < sSlicesArray.length; i++) {
            if (sSlicesArray[i].slice == "break") {
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
            } else if (sSlicesArray[i].slice == "intro" || sSlicesArray[i].slice == "outro") {
                if (randomInt(0, 3) == 1) {
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
            } else // todos os drops
            {
                channelSlices.push({
                    seq: "filled",
                    steps: sSlicesArray[i].steps
                });
            }
        }
    } else if (s == "Perc" || s == "FX" || s == "Lead" || s == "Vocals") {
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
            } else if (sSlicesArray[i].slice == "intro" || sSlicesArray[i].slice == "outro") {
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
    setSceneClip(t, c);
    if (plus) {
        sceneSlotClip.set("name", "New " + name);
    }
    /*var getcolor = getColor(name);
    if (fill == "blank") {
        setClipColor(t, c, [50, 50, 50]);
    } else {
        setClipColor(t, c, getcolor);
    }*/

}
