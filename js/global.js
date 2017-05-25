/**
 * Created by li_zhil on 23/5/17.
 */
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

var renderer, stage, skyContainer, groundContainer, textContainer;
const W = keyboard(87), SPACE = keyboard(32);
var restartMessage, scoreMessage, buffMessage;
const startVelocity = suitWindowSize(4);
const startJumpV = suitWindowSize(16);
var stoneArray, starArray;
var animation;
var score, level, velocity, jumping, groundY, jumpV = startJumpV;

const jumpVAdd = suitWindowSize(5);
var starBuffStartTime = undefined;
var masterJumpTag = false;
var starsGot = 0;

function suitWindowSize(number) {
    return window.innerWidth * number/1024;
}