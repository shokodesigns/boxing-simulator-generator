// Import Libs
const sox = require('sox.js');
const fs = require('fs');
const path = require('path');

/**
 *  1. Organize Audio Objects
 *  - Commands: [jab, cross, hook, uppercut, slip, praise, freestyle]
 *  - Praises
 *  - Background Music 
 *  
 */

// Commands 
    commands = {
        jabs:     {
            dir: path.join(__dirname, 'audio/jab/'),
            sounds: []
        },
        crosses:  {
            dir: path.join(__dirname, 'audio/cross/'),
            sounds: []
        },
        hooks:    {
            dir: path.join(__dirname, 'audio/hook/'),
            sounds: []
        },
        uppercuts: {
            dir: path.join(__dirname, 'audio/uppercut/'),
            sounds: []
        },
        slips: {
            dir: path.join(__dirname, 'audio/slip/'),
            sounds: []
        }
    };
    commands = loadAudio('commands', commands); // Load Audio Files to Object

// Combos
    combos = {
        two_combos: {
            dir: path.join(__dirname, 'combos/2-combo/'),
            sounds: []
        },
        three_combos: {
            dir: path.join(__dirname, 'combos/3-combo/'),
            sounds: []
        },
        four_combos: {
            dir: path.join(__dirname, 'combos/4-combo/'),
            sounds: []
        }
    };
    combos = loadAudio('combos', combos);

// Praises
    praises = {
        general: {
            dir: path.join(__dirname, 'audio/praise/'),
            sounds: []
        }
    };
    praises = loadAudio('praises', praises);

// Silent Breaks (NOTE: No need to sort)
    breaks = {
        half_sec: path.join(__dirname, 'half-sec.mp3'),
        one_point_two_sec: path.join(__dirname, '1-2-sec.mp3'),
        one_sec: path.join(__dirname, '1-sec.mp3'),
        seventh_sec: path.join(__dirname, '70-sec.mp3')
    }

// BG Music
    global.bgMusic = path.join(__dirname, 'audio/music/level-music/level-music.mp3');


/**
 * 2. Load Audio from directories
 * 
 * @param {string} name - Name of audio list
 * @param {object} audioList - Object to populate with audio files
 * 
 * @return {void}
 */

    function loadAudio(name, audioList) {
        // Loop through command directories
        var result = Object.keys(audioList).map(function(key) {
            // Store sound object param in temporary variable
            var tempList    = audioList;
            var dir         = tempList[key]['dir'];

            // Add sounds to commands object
            function processData(data) {
                // Push array to command object
                tempList[key]['sounds'] = data;
                return tempList;
            }

            // Read files in directory
            var updatedList = fs.readdirSync(dir, function (err, files) {
                var tempArray   = [];

                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                } 
                files.forEach(function (file) {
                    // Add sounds to temporary array
                    tempArray.push(file);
                });

                var processedData = processData(tempArray);
                return processedData;
            });
            return updatedList;

        });

        return result;
        
    }




/**
 * 3. Combine Audio
 * - Max of 3 Minutes
 * 
 */

    sox({
        
        soxPath: 'C:\\sox\\sox.exe',
        global: {
            combine: 'merge'
        },
        inputFile: ['jab1.wav','jab1.wav','cross1.wav'],
        output: {
            bits: 16,
            rate: 44100,
            channels: 2
        },
        outputFile: 'result.wav',
        effects: ['tempo', 1.2]

    }, function done(err, outputFilePath) {

        console.log(err) // => null
        console.log(outputFilePath) // => song.wav

    });





/**
 * 4. Export Combined Audio
 * 
 */


/**
 * 5. Loop as Needed
 * 
 *  
 */ 

