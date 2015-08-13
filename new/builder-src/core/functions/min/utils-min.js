function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function chanceOfBreak() {
    if (randomInt(1, 4) < 4) { //check se vai ter break
        if (randomInt(0, 1) == 1) { // check se vai ser no meio ou no final
            if (verses[0] < 32) // check tamanho do verso
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
            } else // verso grande
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
            if (verses[0] < 32) // check tamanho do verso
            {
                sSlicesArray.push({
                    slice: "verso",
                    steps: 12
                });
                sSlicesArray.push({
                    slice: "minibreak",
                    steps: 4
                });
            } else // verso grande
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
    if(!isInArray(s,channelSequence)) {
        for (var i = 0; i < n; i++) {
            channelSequence.push(s);
        }
        log(channelSequence);
    }
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function tGroove(s){
    var n;
    switch(s) {
        case "Shortest":
            n = 1;
            break
        case "Short":
            n = 2;
            break
        case "Long":
            n = 4;
            break
        case "Longest":
            n = 8;
            break
        case "Sparse":
            n = 16;
            break
        case "Broken":
            n = 5;
            break
    }
    return n;
}

