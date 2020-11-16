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
    slips: {
        dir: path.join(__dirname, '/../audio/slip/'),
        sounds: []
    },
    feints: {
        dir: path.join(__dirname, '/../audio/feint/'),
        sounds: []
    },
    pivots: {
        dir: path.join(__dirname, '/../audio/pivot/'),
        sounds: []
    },
    pull_counters: {
        dir: path.join(__dirname, '/../audio/pull-counter/'),
        sounds: []
    },
    rolls: {
        dir: path.join(__dirname, '/../audio/roll/'),
        sounds: []
    },
    steps: {
        dir: path.join(__dirname, '/../audio/step/'),
        sounds: []
    },
    step_lefts: {
        dir: path.join(__dirname, '/../audio/step-left/'),
        sounds: []
    },
    step_rights: {
        dir: path.join(__dirname, '/../audio/step-right/'),
        sounds: []
    },
    switch_stances: {
        dir: path.join(__dirname, '/../audio/switch-stance/'),
        sounds: []
    }
};

// Combos
combos = {
    two_combos: {
        dir: path.join(__dirname, '/../combos/2-combo/'),
        sounds: []
    },
    three_combos: {
        dir: path.join(__dirname, '/../combos/3-combo/'),
        sounds: []
    },
    four_combos: {
        dir: path.join(__dirname, '/../combos/4-combo/'),
        sounds: []
    }
};

// Export this data ...
exports.commands    = commands;
exports.combos      = combos;