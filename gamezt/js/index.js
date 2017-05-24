/**
 * Created by li_zhil on 22/5/17.
 */
loader.add(['../img/atlas.png',
    '../img/stone.jpg',
    '../img/star.png'
]).on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.name);
    console.log("progress: " + loader.progress + "%");
}


function setup() {
    renderer = autoDetectRenderer(786, 512);
    renderer.autoResize = true;
    renderer.resize(786, 512);
    document.body.appendChild(renderer.view);
    start();
}

function start() {
    init();

    renderer.render(stage);

    mdAnimation();
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
    stoneArray = new Array();
    renderNewGround(groundContainer, groundY);
}

function initSky() {
    starArray = new Array();
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
    velocity = startVelocity + level;
    score += velocity;
    scoreMessage.text = 'Score:' + score;
    level = parseInt(score / 5400);
}


function initText() {
    score = 0;
    level = 0;
    restartMessage = new Text("Press SPACE to restart!",
        {fontFamily: "Arial", fontSize: 24, fill: "white"});
    restartMessage.position.set((renderer.width - restartMessage.width) / 2, renderer.height / 2 - 4);
    textContainer.addChild(restartMessage);
    restartMessage.visible = false;

    scoreMessage = new Text('Score:' + score, {fontFamily: "Arial", fontSize: 20, fill: "white"});
    scoreMessage.position.set(renderer.width - 150, 20);
    scoreMessage.visible = true;
    textContainer.addChild(scoreMessage);
}