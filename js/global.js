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

var renderer;
var stage, skyContainer, groundContainer, textContainer;
var W = keyboard(87);
var SPACE = keyboard(32);
var ground, restartMessage, scoreMessage;
var startVelocity = 4;
var startJumpV = 12;
var stoneArray, starArray;
var animation;
var score, level, velocity, jumping, groundY;