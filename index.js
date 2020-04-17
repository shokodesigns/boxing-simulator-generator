// Import Libs
const sox = require('sox.js');
const fs = require('fs');
const path = require('path');



/**
|--------------------------------------------------------------------------
| 1. Declare Global Vars
|--------------------------------------------------------------------------
|
|  - Organize Audio Objects
|  - Commands: [jab, cross, hook, uppercut, slip, praise, freestyle]
|  - Praises
|  - Background Music 
|
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
        right_hooks:    {
            dir: path.join(__dirname, 'audio/right-hook/'),
            sounds: []
        },
        left_hooks:    {
            dir: path.join(__dirname, 'audio/left-hook/'),
            sounds: []
        },
        right_uppercuts: {
            dir: path.join(__dirname, 'audio/right-uppercut/'),
            sounds: []
        },
        left_uppercuts: {
            dir: path.join(__dirname, 'audio/left-uppercut/'),
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

// Freestyles
    freestyles = {
        general: {
            dir: path.join(__dirname, 'audio/freestyle'),
            sounds: []
        }
    }
    freestyles = loadAudio('freestyles', freestyles);

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
        half_sec: path.join(__dirname, 'silence/half-sec.wav'), // 0.5s
        one_point_two_sec: path.join(__dirname, 'silence/1-2-sec.wav'), // 1.2s
        one_sec: path.join(__dirname, 'silence/1-sec.wav'), // 1s
        seventh_sec: path.join(__dirname, 'silence/70-sec.wav'), // 0.7s
        five_sec: path.join(__dirname, 'silence/5-sec.wav'), // 0.7s
        seven_sec: path.join(__dirname, 'silence/7-sec.wav') // 7s
    }

// BG Music
    global.bgMusic = path.join(__dirname, 'audio/music/level-music/level-music-quiet.mp3');

// FX
    global.bell         = path.join(__dirname, 'audio/bell/bell-short-2.wav');
    global.short_break  = path.join(__dirname, 'silence/1-2-sec.wav');





/** 
|--------------------------------------------------------------------------
|  2. loadAudio() | Load Audio from directories
|--------------------------------------------------------------------------
|
| @param {string} name - Name of audio list
| @param {object} audioList - Object to populate with audio files
| 
| @return {void}
|
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

            function traverseDir(dir) {
                var tempArray   = [];

                fs.readdirSync(dir).forEach(file => {
                    let tempFile = path.join(dir, file);
                    tempArray.push(tempFile);
                });

                var processedData = processData(tempArray);
                return processedData;
            }

            var updatedList = traverseDir(dir);
            return updatedList;

        });

        return result;
        
    }



/** 
|--------------------------------------------------------------------------
|  3. generateCommandSection() | Generates an audio section from commands
|--------------------------------------------------------------------------
| - Max of 3 Minutes
|
| @param {object} commandData - Information about commands (i.e. jab, punch, hook etc.)
| @param {object} combinationData - Information about combinatinos 
| @param {object} freestyleData - Contains information about the freestyle
| 
| @return {string} levelUrl - Return URL to file for generated level
|
*/

    // Prepare Data for Generator

    /**
     * @type {object} commandData - Stores information about commands
     * 
     * @property {number} count - Number of commands to return
     * @property {string} break - length of break corresponding to key of breaks object
     */
    let commandData = {
        count: 55,
        break: 'seventh_sec'
    };

    /**
     * @type {object} combinationData - Stores information about combinations
     * 
     * @property {number} count - Number of combinations to return
     * @property {string} break - length of break corresponding to key of breaks object
     */
    let combinationData = {
        count: 18,
        break: 'one_point_two_sec'
    }

    /**
     * @type {object} freestyleData - Stores information about freestyle command
     * 
     * @property {number} count - Number of freestyle commands to return
     * @property {string} break - length of break corresponding to key of breaks object
     */

    let freestyleData = {
        count: 1,
        break: 'half_sec'
    }

    /**
     * @type {object} praiseData - Stores information about praises
     * 
     * @property {number} count - Number of praises to return
     * @property {string} break - length of break corresponding to key of breaks object
     */

    let praiseData = {
        count: 10,
        break: 'five_sec'
    }


    function generateSection(data, voices) {

        /* (Commands)
            - Return randomized array of commands w/ sizeOf commandData.count
            - Return break URL for commands
        */

        let commandCount = data.count;
        let commandBreak = breaks[data.break];
        let commandArray = [];

        // Get Random Command
        for(let i = 0; i < commandCount; i++) {
            // Return Random Command Array
            function randomCommand(voices) {
                // Get Object Keys of parent Commands Object
                var keys = Object.keys(voices);
                var randomNum = keys.length * Math.random() << 0;
                var currentCommandObject = voices[keys[ randomNum ]];

                // Get Object Keys of current Command
                var commandKey = Object.keys(currentCommandObject);
                var randomNum2 = commandKey.length * Math.random() << 0;
                currentCommandArray = currentCommandObject[commandKey[ randomNum2 ]].sounds;

                // Return Random Single Command
                var currentCommand = currentCommandArray[Math.floor(Math.random() * currentCommandArray.length)];
                return currentCommand;
            };

            // Push random command to array
            var currentCommand = randomCommand(voices);
            commandArray.push(currentCommand);

            // Push pause to command array
            commandArray.push(commandBreak);
            
        }

        // Success! Returns list of random commands along with corresponding pauses
        return commandArray;


        

        /* TODO: (Combinations)
            - Return randomized array of combinations w/ sizeOf combinationData.count
            - Return break URL for combinations

        */

        /* TODO: (Freestyle)

        */

    }


/**
 * 4. Generate & Combine Level Combinations
 * 
 */

    let sections = [];
    let commandSection = generateSection(commandData, commands);
    let combinationSection = generateSection(combinationData, combos);
    let freestyleSection = generateSection(freestyleData, freestyles);
    let praiseSection = generateSection(praiseData, praises);

    // Combine all sectinos

    // Add Bell
    sections.push(bell); // Start Bell
    sections.push(short_break); // Short Pause
    let combinedSections = sections.concat(commandSection, combinationSection, freestyleSection, praiseSection);
    combinedSections.push(bell); // End Bell



/**
 * 5. Loop as Needed
 * 
 *  
 */ 

    var numberOfRounds = 100;

    for(var i = 0; i < numberOfRounds; i++) {

    }

    // Generate Level
    // sox({
        
    //     soxPath: 'C:\\sox\\sox.exe',
    //     global: {
    //         combine: 'concatenate'
    //     },
    //     inputFile: combinedSections,
    //     output: {
    //         bits: 16,
    //         rate: 44100,
    //         channels: 2
    //     },
    //     outputFile: 'levels/result.mp3',
    //     effects: ['tempo', 1.2]

    // }, function done(err, outputFilePath) {

    //     console.log(err) // => null
    //     console.log(outputFilePath) // => song.wav

    // });

    // Combine Generated Level w/ background music
    sox({
        
        soxPath: 'C:\\sox\\sox.exe',
        global: {
            combine: 'mix-power'
        },
        inputFile: ['levels/result.mp3', bgMusic],
        output: {
            bits: 16,
            rate: 44100,
            channels: 2
        },
        outputFile: 'levels/result1.mp3'
        // effects: ['tempo', 1.2]

    }, function done(err, outputFilePath) {

        console.log(err) // => null
        console.log(outputFilePath) // => song.wav

    });


