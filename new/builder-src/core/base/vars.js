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

var sSlices = 0;

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


//new 2.0
var introKickBass = false;
var introMiniBreak = false;
var intro = true;
var introSize = 32;
var introPercent = 0;

var outroBass = false;
var outroSmooth = false;
var outro = true;
var outroSize = 32;
var outroPercent = 0;

var verseMiniBreak = false;
var verseSize = 16;
var verseNum = 0;

var breakLong = false;
var breakSize = 16;
var breakNum = 0;

var kickCut = false;
var kickSC = false;
var kickSize = 16;
var kickNotes = 1;

var bassLowEnd = false;
var bassHuman = false;
var bassTone = false;
var bassSize = 0;
var bassNotes = 1;

var snareSteady = false;
var snareHuman = false;
var snareSize = 16;
var snareNotes = 1;
var snareSteadyReady = false;

var hatsSteady = false;
var hatsHuman = false;
var hatsSize = 0;
var hatsNotes = 1;
var hatsSteadyReady = false;

var fxTone = false;
var fxHuman = false;
var fxSize = 0;
var fxNotes = 1;

var percHuman = false;
var percSize = 16;
var percNotes = 2;

var leadTone = false;
var leadHuman = false;
var leadSize = 0;
var leadNotes = 1;

var vocalTone = false;
var vocalHuman = false;
var vocalSize = 0;
var vocalNotes = 1;

var selectedTypeNewSynth = "";
var kickGrooveNotes = [];

var buildFinish = false;
