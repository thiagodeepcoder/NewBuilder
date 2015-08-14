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

//new 2.0
var introKickBass = false;