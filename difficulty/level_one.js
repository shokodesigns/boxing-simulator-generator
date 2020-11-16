const fs = require('fs');
const path = require('path');

// Commands 
commands = {
    jabs:     {
        dir: path.join(__dirname, '/../audio/jab/'),
        sounds: []
    },
    crosses:  {
        dir: path.join(__dirname, '/../audio/cross/'),
        sounds: []
    },
    right_hooks:    {
        dir: path.join(__dirname, '/../audio/right-hook/'),
        sounds: []
    },
    left_hooks:    {
        dir: path.join(__dirname, '/../audio/left-hook/'),
        sounds: []
    },
    right_uppercuts: {
        dir: path.join(__dirname, '/../audio/right-uppercut/'),
        sounds: []
    },
    left_uppercuts: {
        dir: path.join(__dirname, '/../audio/left-uppercut/'),
        sounds: []
    },
    step_lefts: {
        dir: path.join(__dirname, '/../audio/step-left/'),
        sounds: []
    },
    step_rights: {
        dir: path.join(__dirname, '/../audio/step-right/'),
        sounds: []
    }
};

// Combos
combos = {
    two_combos: {
        dir: path.join(__dirname, '/../combos/2-combo/'),
        sounds: []
    }
};

// Export this data ...
exports.commands    = commands;
exports.combos      = combos;