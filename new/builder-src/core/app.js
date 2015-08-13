// Ver 1.1
autowatch = 1;
outlets = 1;
setinletassist(0, "bang triggers action specified in args");
setoutletassist(0, "unique exit of information");

var api;
var liveView;
var liveSetView;
var liveSet; 
var trackView; 

var sceneSlot;
var sceneSlotClip;

var sCreated = false;

var noteTrack;

var countBangs = 0;

var newGroove = [];
var channelSequence = [
    "SC",
    "Kick",
    "Kick cut",
    "Snare fixo",
    "Tops fixo"
];

var sSlicesArray = [];
var channelSlices = [];
var arrayOfNotes = [];

var sSlices = 9;

var cgSelected = 0;

var cStructure = "Agressive";
var cBass = "Short";
var cSnares = "Short";
var cPercs = "Short";
var cTops = "Short";
var cFXs = "Short";
var cPads = "Short";
var cLeads = "Short";
var cLoops = "Short";

var breaks = [16, 3];
var verses = [32, 3];

var numBass = 1;
var numSnares = 1;
var numPercs = 1;
var numTops = 1;
var numFXs = 1;
var numPads = 1;
var numLeads = 1;
var numLoops = 1;

var cgBass = "";
var cgSnares = "";
var cgPerc = "";
var cgTops = "";
var cgFX = "";
var cgPads = "";
var cgLeads = "";

var totalDropDowns = 16;

var DEBUG = true;
var testSingleChannel = [true,"SC"];


function log() {
  for(var i=0,len=arguments.length; i<len; i++) {
    var message = arguments[i];
    if(message && message.toString) {
      var s = message.toString();
      if(s.indexOf("[object ") >= 0) {
        s = JSON.stringify(message);
      }
      post(s);
    }
    else if(message === null) {
      post("<null>");
    }
    else {
      post(message);
    }
  }
  post("\n");
}

// ==================================================
// ======================== Note Creator
// ==================================================

//---------------
// Create Note 60-72
//---------------

function createNotes(t, c, seq) {
    /*if(seq != null)
    {
        setNoteSeq(seq);
    }
    else
    {
        setNoteSeq(this[templateSet[t-1].notes]);
    }*/
    
    var notes = [];
    var args = newGroove;      //getNoteSeq();
    var clip = new Clip(t, c);
    var noteBlock = args.length/2;

    for (var ni = 0; ni < args.length; ni++) {

        var changedNote = convertNote(args[ni].note);

        if (args[ni].size != 0) {
            notes.push(new Note(changedNote, args[ni].init, args[ni].size, 100, 0));
        }
    }
    
    clip.setNotes(notes);
}

function changeNotes(t, c, seq) {
    setNoteSeq(this[seq]);
    var notes = [];
    var args = getNoteSeq();
    var clip = new Clip(t, c);
    var noteBlock = args.length/2;

    
    for (var ni = 0; ni < args.length; ni++) {

        var changedNote = convertNote(args[ni].note);
        if (args[ni].size != 0) {
            notes.push(new Note(changedNote, (0.25 * ni), args[ni].size * 0.25, 100, 0));
        }
    }
    
    return notes;
}

function convertNote(n)
{
    var fNote = n-59;

    for(var nn=0;nn<noteTrack.length;nn++)
    {
        if(fNote<7)
        {
            if(noteTrack[nn] == fNote)
            {
                return fNote + 59;
            }
            else if(noteTrack[nn] == fNote+1)
            {
                return fNote + 59 +1;
            }
            else if(noteTrack[nn] == fNote+2)
            {
                return fNote + 59 +2;
            }
        }
        else
        {
            if(noteTrack[nn] == fNote)
            {
                return fNote + 59;
            }
            else if(noteTrack[nn] == fNote-1)
            {
                return fNote + 59 -1;
            }
            else if(noteTrack[nn] == fNote-2)
            {
                return fNote + 59 -2;
            }
        } 
    }
    
}

/*

c = 1
c# = 2
d = 3
d# = 4
e = 5
f = 6
f# = 7
g = 8
g# = 9
a = 10
a# = 11
b = 12

*/

var scaleC =        [1,3,5,6,8,10,12];
var scaleCsharp =   [1,2,4,6,7,9,11];
var scaleD =        [2,3,5,7,8,10,12];
var scaleDsharp =   [1,3,4,6,8,9,11];
var scaleE =        [2,4,5,7,9,10,12];
var scaleF =        [1,3,4,6,8,10,11];
var scaleFsharp =   [2,4,6,7,9,11,12];
var scaleG =        [1,3,5,7,8,10,12];
var scaleGsharp =   [1,2,4,6,8,9,11];
var scaleA =        [2,3,5,7,9,10,12];
var scaleAsharp =   [1,3,4,6,8,10,11];
var scaleB =        [2,4,5,7,9,11,12];

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
            log(newGroove);
        }
    } else if (channelGroove == "Snare") {
        
        numberNotes = cgSelected;
        var randInit;
        for (var i = 0; i < numberNotes; i++) {
            randInit = randomInt(0, 256);

            newGroove.push({ note: 60, init: randInit/4,size: 1});
        }
    } else if (channelGroove == "Tops fixo") {
        numberNotes = 64;
        for (var i = 0; i < numberNotes; i++) {
            newGroove.push({
                note: 60,
                init: i + 0.5,
                size: 1
            });
        }
    } else if (channelGroove == "Tops") {

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
            nnNotes = 8;
            quanNotes = 32;
            break;
        case 8:
            nnNotes = 6;
            quanNotes = 32;
            break;
        case 16:
            nnNotes = 5;
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
    } else if (s == "Tops" || s=="Tops fixo") {
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

function createClipCustom(t, c, s, fill,name) {
    setTrackClip(t, c);
    sceneSlot.call("create_clip", "" + s * 4);
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

        case "Tops":
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



//--------------------------------------------------------------------
// Note class
  
function Note(pitch, start, duration, velocity, muted) {
  this.pitch = pitch;
  this.start = start;
  this.duration = duration;
  this.velocity = velocity;
  this.muted = muted;
}
  
Note.prototype.toString = function() {
  return '{pitch:' + this.pitch +
         ', start:' + this.start +
         ', duration:' + this.duration +
         ', velocity:' + this.velocity +
         ', muted:' + this.muted + '}';
}
 
Note.MIN_DURATION = 1/128;
  
Note.prototype.getPitch = function() {
  if(this.pitch < 0) return 0;
  if(this.pitch > 127) return 127;
  return this.pitch;
}
  
Note.prototype.getStart = function() {
  // we convert to strings with decimals to work around a bug in Max
  // otherwise we get an invalid syntax error when trying to set notes
  if(this.start <= 0) return "0.0";
  return this.start.toFixed(4);
}
  
Note.prototype.getDuration = function() {
  if(this.duration <= Note.MIN_DURATION) return Note.MIN_DURATION;
  return this.duration.toFixed(4); // workaround similar bug as with getStart()
}
  
Note.prototype.getVelocity = function() {
  if(this.velocity < 0) return 0;
  if(this.velocity > 127) return 127;
  return this.velocity;
}
  
Note.prototype.getMuted = function() {
  if(this.muted) return 1;
  return 0;
}
 

function loadDefaults(s) {
	outlet(0, "loaddev Simpler");
	log("Simpler");
	if(s=="Kick cut") {
		loadDevice("EQ Eight", "LowCut");
	}
	else if(s=="FX" || s=="Perc") {
		loadDeviceU("Reverb");
	}
	else if(s=="Snare fixo" || s=="Tops fixo" || s=="Snare" || s=="Tops")
	{
		loadDeviceU("Reverb");
		loadDevice("EQ Eight", "LowCut");
	}
	else if(s=="Bass") {
		loadDeviceU("Compressor");
	}
}

function loadDeviceU(d) {
    outlet(0, "loaddev " + d);
}

function loadDevice(d, p) {
    outlet(0, "loaddev " + d);
    outlet(0, "swap " + p);
}



//--------------------------------------------------------------------
// Clip class
 
function Clip(t,m) {
  var path = "live_set tracks " + t + " clip_slots " + m + " clip";
  this.liveObject = new LiveAPI(path);
}
  
Clip.prototype.getLength = function() {
  return this.liveObject.get('length');
}
  
Clip.prototype._parseNoteData = function(data) {
  var notes = [];
  // data starts with "notes"/count and ends with "done" (which we ignore)
  for(var i=2,len=data.length-1; i<len; i+=6) {
    // and each note starts with "note" (which we ignore) and is 6 items in the list
    var note = new Note(data[i+1], data[i+2], data[i+3], data[i+4], data[i+5]);
    notes.push(note);
  }
  return notes;
}
  
Clip.prototype.getSelectedNotes = function() {
  var data = this.liveObject.call('get_selected_notes');
  return this._parseNoteData(data);
}
  
   
Clip.prototype.getNotes = function(startTime, timeRange, startPitch, pitchRange) {
  if(!startTime) startTime = 0;
  if(!timeRange) timeRange = this.getLength();
  if(!startPitch) startPitch = 0;
  if(!pitchRange) pitchRange = 128;
   
  var data = this.liveObject.call("get_notes", startTime, startPitch, timeRange, pitchRange);
  return this._parseNoteData(data);
}
 
Clip.prototype._sendNotes = function(notes) {
  var liveObject = this.liveObject;
  liveObject.call("notes", notes.length);
  notes.forEach(function(note) {
    liveObject.call("note", note.getPitch(),
                    note.getStart(), note.getDuration(),
                    note.getVelocity(), note.getMuted());
  });
  liveObject.call('done');
}
  
Clip.prototype.replaceSelectedNotes = function(notes) {
  this.liveObject.call("replace_selected_notes");
  this._sendNotes(notes);
}
  
Clip.prototype.setNotes = function(notes) {
  this.liveObject.call("set_notes");
  this._sendNotes(notes);
}
 
Clip.prototype.selectAllNotes = function() {
  this.liveObject.call("select_all_notes");
}
 
Clip.prototype.replaceAllNotes = function(notes) {
  this.selectAllNotes();
  this.replaceSelectedNotes(notes);
}



function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceOfBreak() {
    if (randomInt(1, 4) < 4) { //check se vai ter break
        if (randomInt(0, 1) == 1) { // check se vai ser no meio ou no final
            if (verses[0] < 32) // check tamanho do verso
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 4
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                }); // meio
                sSlicesArray.push({
                    slice: "verso",
                    steps: 8
                });
            } else // verso grande
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                }); // meio
                sSlicesArray.push({
                    slice: "verso",
                    steps: 16
                });
            }

        } else { // final
            if (verses[0] < 32) // check tamanho do verso
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                });
            } else // verso grande
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 16
                });
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                });
            }
        }

    } else {

        sSlicesArray.push({
            slice: "verso",
            steps: verses[0]
        });
    }
}

function addToChannelStructure(n, s) {
    if(!isInArray(s,channelSequence)) {
        for (var i = 0; i < n; i++) {
            channelSequence.push(s);
        }
        log(channelSequence);
    }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function tGroove(s){
    var n;
    switch(s) {
        case "Shortest":
            n = 1;
            break
        case "Short":
            n = 2;
            break
        case "Long":
            n = 4;
            break
        case "Longest":
            n = 8;
            break
        case "Sparse":
            n = 16;
            break
        case "Broken":
            n = 5;
            break
    }
    return n;
}

setNote("C");

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




