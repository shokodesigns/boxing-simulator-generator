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

            // Read files in directory
            // var updatedList = fs.readdirSync(dir, function (err, files) {
            //     var tempArray   = [];

            //     if (err) {
            //         return console.log('Unable to scan directory: ' + err);
            //     } 
            //     files.forEach(function (file) {
            //         // Add sounds to temporary array
            //         var tempFile = path.resolve(file);
            //         tempArray.push(tempFile);
            //     });

            //     var processedData = processData(tempArray);
            //     return processedData;
            // });


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
|  3. generateLevel() | Generates a game level from audio
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
        count: 30,
        break: 'seventh_sec'
    };

    /**
     * @type {object} combinationData - Stores information about combinations
     * 
     * @property {number} count - Number of combinations to return
     * @property {string} break - length of break corresponding to key of breaks object
     */
    let combinationData = {
        count: 20,
        break: 'one_point_two_sec'
    }

    /**
     * @type {object} freestyleData - Stores information about freestyles
     * 
     * @property {number} time - Number of combinations to return
     * @property {number} praiseCount - Number of praises to return
     */

    let freestyleData = {
        time: 30,
        praiseCount: 10
    }


    function generateLevel(commandData, combinationData, freestyleData) {

        /* (Commands)
            - Return randomized array of commands w/ sizeOf commandData.count
            - Return break URL for commands
        */

        let commandCount = commandData.count;
        let commandBreak = breaks[commandData.break];
        let commandArray = [];

        // Get Random Command
        for(let i = 0; i < commandCount; i++) {
            // Return Random Command Array
            function randomCommand(commands) {
                // Get Object Keys of parent Commands Object
                var keys = Object.keys(commands);
                var randomNum = keys.length * Math.random() << 0;
                var currentCommandObject = commands[keys[ randomNum ]];

                // Get Object Keys of current Command
                var commandKey = Object.keys(currentCommandObject);
                var randomNum2 = commandKey.length * Math.random() << 0;
                currentCommandArray = currentCommandObject[commandKey[ randomNum2 ]].sounds;

                // Return Random Single Command
                var currentCommand = currentCommandArray[Math.floor(Math.random() * currentCommandArray.length)];
                return currentCommand;
            };

            // Push random command to array
            var currentCommand = randomCommand(commands);
            commandArray.push(currentCommand);

            // Push pause to command array
            commandArray.push(commandBreak);
            
        }

        // Success! Returns list of random commands along with corresponding pauses
        console.log(commandArray);


        

        /* TODO: (Combinations)
            - Return randomized array of combinations w/ sizeOf combinationData.count
            - Return break URL for combinations

        */

        /* TODO: (Freestyle)

        */



        // sox({
        
        //     soxPath: 'C:\\sox\\sox.exe',
        //     global: {
        //         combine: 'merge'
        //     },
        //     inputFile: ['jab1.wav','jab1.wav','cross1.wav'],
        //     output: {
        //         bits: 16,
        //         rate: 44100,
        //         channels: 2
        //     },
        //     outputFile: 'result.wav',
        //     effects: ['tempo', 1.2]
    
        // }, function done(err, outputFilePath) {
    
        //     console.log(err) // => null
        //     console.log(outputFilePath) // => song.wav
    
        // });

    }
    generateLevel(commandData, combinationData, freestyleData);




/**
 * 4. Export Combined Audio
 * 
 */


/**
 * 5. Loop as Needed
 * 
 *  
 */ 

