/**
 * Created by li_zhil on 22/5/17.
 */
loader.add(['../img/atlas.png',
    '../img/stone.png',
    '../img/star.png'
]).on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.name);
    console.log("progress: " + loader.progress + "%");
}


function setup() {
    renderer = autoDetectRenderer(suitWindowSize(1024) * 0.8, suitWindowSize(1024) * 0.8 * 0.6);
    renderer.autoResize = true;
    renderer.resize(suitWindowSize(1024) * 0.8, suitWindowSize(1024) * 0.8 * 0.6);
    document.body.appendChild(renderer.view);
    bump= new Bump(renderer);
    start();
}

function start() {
    init();

    renderer.render(stage);

    mdAnimation();

    ENTER.press = pauseGame;
}

function init() {
    stage = new Container();
    skyContainer = new Container();
    groundContainer = new Container();
    textContainer = new Container();
    stage.addChild(skyContainer);
    stage.addChild(groundContainer);
    stage.addChild(textContainer);

    groundY = 0.8 * renderer.height;
    initGround();
    initSky();
    initText();
}

function initGround() {
    velocity = startVelocity;
    SPACE.press = null;
    jumping = false;
    jumpV = startJumpV;
    stoneArray = new Array();
    renderNewGround(groundContainer, groundY);
}

function initSky() {
    starArray = new Array();
    level = 0;
    setStarBuffStartTime(undefined);
}

function mdAnimation() {
    animation = requestAnimationFrame(mdAnimation);
    randomProduceStar(skyContainer);
    randomProduceStone(groundContainer);
    moveGround(groundContainer);
    moveStones(groundContainer);
    moveStars(skyContainer);
    jumpMd(groundContainer);
    rollMd(groundContainer);
    updateScore(textContainer);
    renderer.render(stage);
}

function updateScore(){
    velocity = startVelocity + level * 3;
    score += velocity/60;
    scoreMessage.text = 'Score:' + parseInt(score);
    level = score / 200;
}


function initText() {
    score = 0;
    centerMessage = new Text("Press SPACE to restart!",
        {fontFamily: "Arial", fontSize: parseInt(suitWindowSize(24)), fill: "white"});
    textContainer.addChild(centerMessage);
    centerMessage.visible = false;

    scoreMessage = new Text('Score:' + score, {fontFamily: "Arial", fontSize: parseInt(suitWindowSize(20)), fill: "white"});
    scoreMessage.position.set(renderer.width - suitWindowSize(100), suitWindowSize(5));
    scoreMessage.visible = true;
    textContainer.addChild(scoreMessage);
}