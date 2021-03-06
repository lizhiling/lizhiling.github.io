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

var renderer, bump, stage, skyContainer, groundContainer, textContainer;
const W = keyboard(87), SPACE = keyboard(32), ENTER = keyboard(13);
var centerMessage, scoreMessage;
const startVelocity = suitWindowSize(4);
const startJumpV = suitWindowSize(10);
var stoneArray, starArray, wallArray;
var animation, wallAnimation;
var score, level, velocity, jumping, groundY, jumpV = startJumpV;
var pause = false;

const jumpVAdd = suitWindowSize(4);
var starBuffStartTime = undefined;
var phdJumpTag = false;
var starsGot = 0;
var touchWallLeft = false, touchWallTop=false, touchWallBottom=false;

function suitWindowSize(number) {
    return window.innerWidth * number/1024;
}