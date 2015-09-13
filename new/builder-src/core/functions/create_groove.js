function createGroove(instrument) {
	newGroove = [];
	var channelGroove = instrument;
	var numberNotes;

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
			var randInit;
			for (var j = 0; j < 16 / kickSize; j++) {
				if (j == 0) {
					for (var i = 0; i < kickNotes; i++) {

						randInit = randomInt(0, kickSize * 8);

						while (isInArray(randInit, arrayOfNotes)) {
							randInit = randomInt(0, kickSize * 8);
						}
						if (isOdd(randInit) == 0) {
							randInit += 1;
						}
						arrayOfNotes.push(randInit);
						newGroove.push({
							note: 60,
							init: randInit / 2,
							size: 0.5
						});
					}
				} else {
					for (var i = 0; i < kickNotes; i++) {
						newGroove.push({
							note: 60,
							init: ((arrayOfNotes[i]) / 2) + ((j * kickSize * 4)),
							size: 0.5
						});
					}
				}
			}
			kickGrooveNotes = newGroove;
		} else {
			newGroove = kickGrooveNotes;
		}
		//kickGrooveNotes = [];
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

		var randInit;
		for (var i = 0; i < 8; i++) {
			newGroove.push({
				note: 60,
				init: i * 8,
				size: 8
			});
		}

		// código para pad com variação de notas

		/*numberNotes = cgSelected;
		var randInit;
		for (var i = 0; i < numberNotes; i++) {
		    randInit = randomInt(0, 256);
		    newGroove.push({
		        note: randomInt(60, 72),
		        init: randInit / 4,
		        size: 4
		    });
		}*/
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
	} else if (channelGroove == "Lowend" || channelGroove == "Loop") {
		log(newGroove);
		numberNotes = cgSelected;
		var randInit = 8;
		for (var i = 0; i < randInit; i++) {
			newGroove.push({
				note: 60,
				init: i * 8,
				size: 8
			});
		}
	} else if (channelGroove == "Bass") {

		var randInit;
		var tone = 0;
		var toneArray = [];
		var variation = 0;

		var size = bassSize;
		var human = bassHuman;
		var notes = bassNotes
		var iTone = bassTone


		for (var j = 0; j < 64 / size; j++) { // 256/quanNotes
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


					if (randInit % 4 == 0) {
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
}
