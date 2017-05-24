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
const W = keyboard(87);
const SPACE = keyboard(32);
var restartMessage, scoreMessage;
const startVelocity = screen.width * 5/1920;
const startJumpV = screen.width * 16/1920;
var stoneArray, starArray;
var animation;
var score, level, velocity, jumping, groundY, jumpV = startJumpV;