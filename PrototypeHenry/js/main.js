/** @type {import("phaser")} */

import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {Game} from "./scenes/Game.js";
let game = new Phaser.Game({
    width: 1500,
    height: 600,
    scene:[
        LoadScene,
        MenuScene,
        Game
    ],
    renderer:{
        pixelart: true
    },
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
})