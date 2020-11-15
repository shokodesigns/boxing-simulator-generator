// Import Libs
const sox = require('sox.js');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

// Node arguments
const argv          = yargs(hideBin(process.argv)).argv;
let difficultyArg   = 1; // Default to 1 difficulty ...
let roundsCountArg  = 1; // Default to 1 round ...

// Set Diffifulty ...
if(argv.difficulty) {
    difficultyArg   = argv.difficulty; // Set difficulty via command line ...
} 

// Set Rounds ...
if(argv.rounds) {
    roundsCountArg   = argv.rounds; // Set rounds via command line ...
} 


/**
|--------------------------------------------------------------------------
| 0. Set level defaults
|--------------------------------------------------------------------------
|
|  - Organize Audio Objects
|  - Commands: [jab, cross, hook, uppercut, slip, praise, freestyle]
|  - Praises
|  - Background Music 
|
*/
// Generate level count from difficulty
let commandsCount,
    combosCount,
    freestyleCount,
    praiseCount;

switch(difficultyArg) {
    case 1:
        commandsCount   = 132,
        combosCount     = 0,
        freestyleCount  = 0,
        praiseCount     = 0;
        break;
    case 2:

        break;  
    case 3:
        commandsCount   = 55,
        combosCount     = 18,
        freestyleCount  = 1,
        praiseCount     = 12;
        break;
    case 4:
        
        break;
    case 5:
        
        break;
    default:
        commandsCount   = 55,
        combosCount     = 18,
        freestyleCount  = 1,
        praiseCount     = 12;
}




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
        },
        feints: {
            dir: path.join(__dirname, 'audio/feint/'),
            sounds: []
        },
        pivots: {
            dir: path.join(__dirname, 'audio/pivot/'),
            sounds: []
        },
        pull_counters: {
            dir: path.join(__dirname, 'audio/pull-counter/'),
            sounds: []
        },
        rolls: {
            dir: path.join(__dirname, 'audio/roll/'),
            sounds: []
        },
        steps: {
            dir: path.join(__dirname, 'audio/step/'),
            sounds: []
        },
        step_lefts: {
            dir: path.join(__dirname, 'audio/step-left/'),
            sounds: []
        },
        step_rights: {
            dir: path.join(__dirname, 'audio/step-right/'),
            sounds: []
        },
        switch_stances: {
            dir: path.join(__dirname, 'audio/switch-stance/'),
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
        count: commandsCount,
        break: 'seventh_sec'
    }; // Approx 1:15 long...

    /**
     * @type {object} combinationData - Stores information about combinations
     * 
     * @property {number} count - Number of combinations to return
     * @property {string} break - length of break corresponding to key of breaks object
     */
    let combinationData = {
        count: combosCount,
        break: 'one_point_two_sec'
    } // Approx 0:45 ...

    /**
     * @type {object} freestyleData - Stores information about freestyle command
     * 
     * @property {number} count - Number of freestyle commands to return
     * @property {string} break - length of break corresponding to key of breaks object
     */

    let freestyleData = {
        count: freestyleCount,
        break: 'half_sec'
    } // Approx 1:00 ...

    /**
     * @type {object} praiseData - Stores information about praises
     * 
     * @property {number} count - Number of praises to return
     * @property {string} break - length of break corresponding to key of breaks object
     */

    let praiseData = {
        count: praiseCount,
        break: 'five_sec'
    }


    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
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

                var commandArray         = Object.keys(voices);
                    commandArray         = shuffle(commandArray);
                var randomNumber         = Math.random();
                var commandIndex         = Math.floor(randomNumber * commandArray.length);
                var currentCommandObject = voices[commandArray[ commandIndex ]];

                // Get Object Keys of parent Commands Object
                // var keys = Object.keys(voices);
                // var randomNum = keys.length * Math.random() << 0;
                // var currentCommandObject = voices[keys[ randomNum ]];

                // Get Object Keys of current Command
                var commandKey      = Object.keys(currentCommandObject);
                var randomNum2      = Math.random();
                var randomIndex2    = Math.floor(randomNum2 * commandKey.length);
                currentCommandArray = currentCommandObject[commandKey[ randomIndex2 ]].sounds;
                
                console.log(currentCommandArray);
                // // Get Object Keys of current Command
                // var commandKey      = Object.keys(currentCommandObject);
                // var randomNum2      = commandKey.length * Math.random() << 0;
                // currentCommandArray = currentCommandObject[commandKey[ randomNum2 ]].sounds;


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

    }


/**
 * 4. Generate & Combine Level Combinations
 * 
 */


/**
 * 5. Loop as Needed
 * 
 * TODO: Set up generator to work in without having to toggle
 * between 'Generate Levels' & 'Combine Levels'
 */ 

    var numberOfRounds = roundsCountArg;

    // Generate Levels
    for(var i = 0; i < numberOfRounds; i++) {


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
        


        sox({
                
            soxPath: 'C:\\sox\\sox.exe',
            global: {
                combine: 'concatenate'
            },
            inputFile: combinedSections,
            output: {
                bits: 16,
                rate: 44100,
                channels: 2
            },
            outputFile: 'levels/result' + i + '.wav',
            effects: ['tempo', 1.2]

        }, function done(err, outputFilePath) {

            console.log(err) // => null
            console.log(outputFilePath) // => song.wav

        });

    }



    // Combine Generated Level w/ background music
    // for(var i = 0; i < numberOfRounds; i++) {

    //     sox({
            
    //         soxPath: 'C:\\sox\\sox.exe',
    //         global: {
    //             combine: 'mix-power'
    //         },
    //         inputFile: ['levels/result' + i + '.wav', bgMusic],
    //         output: {
    //             bits: 16,
    //             rate: 44100,
    //             channels: 2
    //         },
    //         outputFile: 'levels/level' + i + '.wav'
    //         // effects: ['tempo', 1.2]

    //     }, function done(err, outputFilePath) {

    //         console.log(err) // => null
    //         console.log(outputFilePath) // => song.wav

    //     });
    // }
    


