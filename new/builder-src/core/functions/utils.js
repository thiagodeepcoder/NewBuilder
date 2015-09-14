function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceOfBreak() {
	var vHumanizer = 0;
	if (verseHumanizer) {
		vHumanizer = randomInt(1, 2) * 2;
	}
	if (verseMiniBreak == true && randomInt(0, 99) < 75 ) { //check se vai ter break
		if (verseSize == 16) // check tamanho do verso
		{
			sSlicesArray.push({
				slice: "verso",
				steps: 12 + vHumanizer
			});
			sSlicesArray.push({
				slice: "minibreak",
				steps: 4
			});
		} else if (verseSize == 32) // verso grande
		{
			sSlicesArray.push({
				slice: "verso",
				steps: 16
			});
			sSlicesArray.push({
				slice: "verso",
				steps: 12 + vHumanizer
			});
			sSlicesArray.push({
				slice: "minibreak",
				steps: 4
			});
		}
		//}

	} else {

		sSlicesArray.push({
			slice: "verso",
			steps: verseSize - vHumanizer
		});
	}
}

function addToChannelStructure(n, s) {
	if (!isInArray(s, channelSequence)) {
		for (var i = 0; i < n; i++) {
			channelSequence.push(s);
		}
	}
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

function tGroove(s) {
	var n;
	switch (s) {
		case "Shortest":
			n = 16;
			break
		case "Short":
			n = 8;
			break
		case "Long":
			n = 4;
			break
		case "Longest":
			n = 2;
			break
		case "Sparse":
			n = 1;
			break
		case "Broken":
			n = 5;
			break
	}
	return n;
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isOdd(num) {
	return num % 2;
}

function note2Num(min, max, percentage) {
	var v = Math.floor(((max - min) * percentage) + min);
	return v;
}

function notes2Channels(n) {
	switch (n) {
		case 0.2:
			return 1;
			break
		case 0.4:
			return 2;
			break
		case 0.6:
			return 3;
			break
		case 0.8:
			return 4;
			break
		case 1:
			return 5;
			break
	}
}

function resetBang() {
	arrayOfNotes = [];
	channelSlices = [];

}

function toHHMMSS(n) {
	var sec_num = parseInt(n, 10); // don't forget the second param
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var time = minutes + ':' + seconds;
	return time;
}
