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
var channelSequence = [];

var sSlicesArray = [];
var channelSlices = [];
var arrayOfNotes = [];

var sSlices = 10;

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

var numBass = 0;
var numSnares = 0;
var numPercs = 0;
var numHats = 0;
var numFXs = 0;
var numPads = 0;
var numLeads = 0;
var numVocals = 0;

//new 2.0
var introKickBass = false;
var introMiniBreak = false;
var intro = false;
var introSize = 8;
var introPercent = 0;

var outroBass = false;
var outroSmooth = false;
var outro = false;
var outroSize = 16;
var outroPercent = 0;

var verseMiniBreak = false;
var verseSize = 16;
var verseNum = 0;

var breakLong = false;
var breakSize = 8;
var breakNum = 0;
var dropSize = 8;

var kickCut = false;
var kickSC = false;
var kickSize = 16;
var kickNotes = 0;

var bassLowEnd = false;
var bassHuman = false;
var bassTone = false;
var bassSize = 16;
var bassNotes = 1;

var snareSteady = false;
var snareHuman = false;
var snareSize = 16;
var snareNotes = 1;
var snareSteadyReady = false;

var hatsSteady = false;
var hatsHuman = false;
var hatsSize = 16;
var hatsNotes = 1;
var hatsSteadyReady = false;

var fxTone = false;
var fxHuman = false;
var fxSize = 16;
var fxNotes = 1;

var percHuman = false;
var percSize = 16;
var percNotes = 1;

var leadTone = false;
var leadHuman = false;
var leadSize = 16;
var leadNotes = 1;

var vocalTone = false;
var vocalHuman = false;
var vocalSize = 16;
var vocalNotes = 1;

var selectedTypeNewSynth = "";
var kickGrooveNotes = [];

var buildFinish = false;

var meterTotal = 0;
