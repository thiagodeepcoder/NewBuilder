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