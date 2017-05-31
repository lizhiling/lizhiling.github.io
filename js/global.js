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
const W = keyboard(87), P = keyboard(80), SPACE = keyboard(32), ENTER = keyboard(13);
var centerMessage, scoreMessage;
const startVelocity = suitWindowSize(4);
const startJumpV = suitWindowSize(10);
var stoneArray, starArray;
var animation;
var score, level, velocity, groundY, jumpV = startJumpV;
var pause = false;
var ableToPropUpArray;

const jumpVAdd = suitWindowSize(4);

function suitWindowSize(number) {
    return window.innerWidth * number/1024;
}