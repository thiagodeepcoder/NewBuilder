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
					steps: dropSize
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

				var bHumanizer = 0;
				if (breakHumanizer) {
					bHumanizer  = randomInt(-1, 1)*2;
				}

				if (randin == 0) { // 0 escolhe break
					if (bCounter < breakNum) // check se tem breaks avaliable
					{
						sSlicesArray.push({
							slice: "break",
							steps: breakSize + bHumanizer
						});
						log(breakSize + bHumanizer);
						if (breakLong ) {
							sSlicesArray.push({
								slice: "break",
								steps: breakSize
							});
							breakLong = false;
						} 
						sSlicesArray.push({
							slice: "drop",
							steps: dropSize
						});
						bCounter++;
					} else {
						chanceOfBreak();
						vCounter++;
					}

				} else if (randin == 1) { // 1 escolhe verso
					if (vCounter < verseNum ) // check se tem verses avaliable
					{
						chanceOfBreak();
						vCounter++;
					} else {
						sSlicesArray.push({
							slice: "break",
							steps: breakSize + bHumanizer
						});
						sSlicesArray.push({
							slice: "drop",
							steps: dropSize
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
