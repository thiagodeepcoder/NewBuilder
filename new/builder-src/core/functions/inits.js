setNote("C");

setMeter();

setTotalTime();

readJSON();

function PHPSelect(s) {

	ajaxreqs = new XMLHttpRequest();
	ajaxreqs.open("GET", "http://localhost:8888/connect.php?db=pack2&table=" + s + "&action=select");
	ajaxreqs.onreadystatechange = readyPHP;
	ajaxreqs.send("{}");
}

function PHPUpdate(table, synth) {
	ajaxreqs = new XMLHttpRequest();
	ajaxreqs.open("GET", "http://localhost:8888/connect.php?db=pack2&table=" + table + "&action=update&synth=" + synth);
	ajaxreqs.onreadystatechange = generalResponse;
	ajaxreqs.send("{}");
}

function generalResponse() {

}


function readyPHP() {
	if (this.readyState == 4) {
		// Get the data from the server's response
		var phpData = this.responseText.split(",");
		for (var i = 0; i < phpData.length; i++) {
			if (phpData[i] != "" && i > 0) {
				inSynthArray(phpData[0], phpData[i]);

			}
		}
	}

}


function inSynthArray(a, v) {
	this["ap" + a].push(v);
}

function getResponses() {
	apbass = [];
	apkick = [];
	apkickcut = [];
	aphats = [];
	apfx = [];
	aplead = [];
	aploop = [];
	aplowend = [];
	appad = [];
	apperc = [];
	apshot = [];
	apsnare = [];
	apvocals = [];
	for (var i = 0; i < arrayofTables.length; i++) {
		PHPSelect(arrayofTables[i]);
		log("Statistics loaded from " + arrayofTables[i]);
	};
}
//getResponses();
