function createCSequence(s) {
	if (s == "SC") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			channelSlices.push({
				seq: "filled",
				steps: sSlicesArray[i].steps
			});
		}
	} else if (s == "Kick") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (!outroSmooth) {
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
	} else if (s == "Kick cut") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				if (randomInt(0, 3) == 1) {
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
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (outroSmooth) {
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
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (!outroSmooth) {
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
	} else if (s == "Lowend") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "blank",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "outro") {
				if (!outroSmooth) {
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
			} else if (sSlicesArray[i].slice == "intro") {
				if (introKickBass) {
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
	} else if (s == "Loop") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break") {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) >= outroPercent) {
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
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) >= introPercent) {
					channelSlices.push({
						seq: "filled",
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
	} else if (s == "Snare") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak" || sSlicesArray[i].slice == "drop") {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) >= outroPercent) {
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
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) >= introPercent) {
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
	} else if (s == "Hats") {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) <= outroPercent) {
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
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) <= introPercent) {
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
	} else if (s == "Hats fixo") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break") {
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
			} else if (sSlicesArray[i].slice == "intro" || sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 2) == 1) {
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
			} else // todos os drops
			{
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			}
		}
	} else if (s == "Perc" || s == "FX" || s == "Lead" || s == "Vocals" || s == "Shot") {
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
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) <= introPercent) {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) <= outroPercent) {
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
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break" || sSlicesArray[i].slice == "minibreak") {
				channelSlices.push({
					seq: "filled",
					steps: sSlicesArray[i].steps
				});
			} else if (sSlicesArray[i].slice == "intro") {
				if (randomInt(0, 100) <= introPercent) {
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
			} else if (sSlicesArray[i].slice == "outro") {
				if (randomInt(0, 100) <= outroPercent) {
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
	} else if (s == "Combo") {
		for (var i = 0; i < sSlicesArray.length; i++) {
			if (sSlicesArray[i].slice == "break") {
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
