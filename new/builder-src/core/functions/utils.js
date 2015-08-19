function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceOfBreak() {
    if (randomInt(0, 1)  == 1 && verseMiniBreak == true) { //check se vai ter break
        if (randomInt(0, 1) == 1) { // check se vai ser no meio ou no final
            if (verseSize == 16) // check tamanho do verso
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 4
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                }); // meio
                sSlicesArray.push({
                    slice: "verso",
                    steps: 8
                });
            } else if (verseSize == 24) // verso medio
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                }); // meio
                sSlicesArray.push({
                    slice: "verso",
                    steps: 8
                });
            }
            else if (verseSize == 32) // verso grande
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                }); // meio
                sSlicesArray.push({
                    slice: "verso",
                    steps: 16
                });
            }

        } else { // final
            if (verseSize == 16) // check tamanho do verso
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                });
            } else if (verseSize == 24) // verso grande
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 16
                });
                sSlicesArray.push({
                    slice: "verso",
                    steps: 4
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                });
            }
            else if (verseSize == 32) // verso grande
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 16
                });
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                });
            }
        }

    } else {

        sSlicesArray.push({
            slice: "verso",
            steps: verses[0]
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

function note2Num(min,max,percentage) {
    var v = ((max - min) * percentage) + min
    return v;
}

function notes2Channels(n) {
    switch (n) {
        case 0:
            return 1;
            break
        case 0.5:
            return 2;
            break
        case 1:
            return 3;
            break
        case 1.5:
            return 4;
            break
        case 2:
            return 5;
            break
    }
}

function resetBang() {
    arrayOfNotes = [];
    channelSlices = [];
    sSlicesArray = [];
}

function updateChannels() {

}
