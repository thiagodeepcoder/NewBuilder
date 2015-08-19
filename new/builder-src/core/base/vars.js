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
    "Tops fixo",
    "Bass"
];

var sSlicesArray = [];
var channelSlices = [];
var arrayOfNotes = [];

var sSlices = 9;

var cgSelected = 0;

var cStructure = "Agressive";
var cBass = 1;
var cSnares = 1;
var cPercs = 1;
var cHats = 1;
var cFXs = 1;
var cPads = 1;
var cLeads = 1;
var cVocals = 1;

var breaks = [16, 1];
var verses = [32, 1];

var numBass = 1;
var numSnares = 1;
var numPercs = 1;
var numHats = 1;
var numFXs = 1;
var numPads = 1;
var numLeads = 1;
var numVocals = 1;

var cgBass = "Long";
var cgSnares = "Short";
var cgPerc = "Short";
var cgHats = "Shortest";
var cgFX = "Short";
var cgPads = "Short";
var cgLeads = "Short";
var cgVocals = "Short";

var totalDropDowns = 16;

//new 2.0
var introKickBass = false;
var introMiniBreak = false;
var intro = false;
var introSize = 0;
var introPercent = 0;

var outroBass = false;
var outroSmooth = false;
var outro = false;
var outroSize = 0;
var outroPercent = 0;

var verseMiniBreak = false;
var verseSize = 0;
var verseNum = 0;

var breakLong = false;
var breakSize = 0;
var breakNum = 0;

var kickcut = false;
var kicksize = 0;
var kickNotes = 0;

var bassLowEnd = false;
var bassHuman = false;
var bassTone = false;
var bassSize = 0;
var bassNotes = 0;

var snareSteady = false;
var snareHuman = false;
var snareSize = 0;
var snareNotes = 0;

var hatsSteady = false;
var hatsHuman = false;
var hatsSize = 0;
var hatsNotes = 0;

var fxTone = false;
var fxHuman = false;
var fxSize = 0;
var fxNotes = 0;

var percHuman = false;
var percSize = 0;
var percNotes = 0;

var leadTone = false;
var leadHuman = false;
var leadSize = 0;
var leadNotes = 0;

var vocalTone = false;
var vocalHuman = false;
var vocalSize = 0;
var vocalNotes = 0;

var selectedTypeNewSynth = "";