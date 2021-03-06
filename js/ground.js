/**
 * Created by li_zhil on 23/5/17.
 */
var groundContainerA, groundContainerB, md;

function renderNewGround(groundContainer, groundY) {
    jumpVDynamic = jumpV;

    md = new Sprite(resources["../img/atlas.png"].texture);
    md.height = 0.15 * renderer.height;
    md.width = md.height;
    md.x = 0.2 * renderer.width;
    md.y = groundY - md.height / 2;
    md.anchor.x = 0.5;
    md.anchor.y = 0.5;

    groundContainer.addChild(md);


    groundContainerA = new Container();
    groundContainerB = new Container();

    var groundLine = new Graphics();
    groundLine.lineStyle(4, 0xFFFFFF, 1);
    groundLine.moveTo(0, groundY);
    groundLine.lineTo(renderer.width, groundY);
    groundContainer.addChild(groundLine);

    var decorateLine1 = decorateLine(0, 1.15 * groundY, renderer.width*0.2);
    var decorateLine1copy = decorateLine(0 + renderer.width, 1.15 * groundY, renderer.width*0.2);

    var decorateLine2 = decorateLine(renderer.width*0.55, 1.05 * groundY, renderer.width*0.3);
    var decorateLine2copy = decorateLine(renderer.width*0.55 + renderer.width, 1.05 * groundY, renderer.width*0.3);

    var decorateLine3 = decorateLine(renderer.width*0.3, 1.23 * groundY, renderer.width*0.3);
    var decorateLine3copy = decorateLine(renderer.width*0.3 + renderer.width, 1.23 * groundY, renderer.width*0.3);

    var decorateLine4 = decorateLine(renderer.width*0.2, 1.11 * groundY, renderer.width*0.3);
    var decorateLine4copy = decorateLine(renderer.width*0.2 + renderer.width, 1.11 * groundY, renderer.width*0.3);
    groundContainerB.addChild(decorateLine1copy);
    groundContainerA.addChild(decorateLine1);
    groundContainerB.addChild(decorateLine2copy);
    groundContainerA.addChild(decorateLine2);
    groundContainerB.addChild(decorateLine3copy);
    groundContainerA.addChild(decorateLine3);
    groundContainerB.addChild(decorateLine4copy);
    groundContainerA.addChild(decorateLine4);

    groundContainer.addChild(groundContainerB);
    groundContainer.addChild(groundContainerA);

    document.getElementsByTagName('canvas')[0].onclick = function () {
        if(md.y + md.height / 2 >= groundY || phdJumpTag|| supportedWall){
            jumpVDynamic = jumpV;
            jumping = true;
        }
    };
}

function decorateLine(x, y, width) {
    var decorateLine = new Graphics();
    decorateLine.lineStyle(2, 0xFFFFFF, 1);
    decorateLine.moveTo(x, y);
    decorateLine.lineTo(x + width, y);
    return decorateLine;
}

function moveGround() {
    // console.log('move ground');
    groundContainerA.position.x -= velocity;
    groundContainerB.position.x -= velocity;
    if(groundContainerA.position.x < -renderer.width){
        groundContainerA.position.x = 0;
    }
    if(groundContainerB.position.x < -renderer.width){
        groundContainerB.position.x = 0;
    }
}

function getMd(){
    return md;
}


function randomProduceStone(groundContainer) {
    var frequency = 2;
    var maxStoneNo = 4;
    var r = Math.random();
    if (r < 1 / (60 * frequency) && stoneArray.length < maxStoneNo) {
        if(stoneArray[stoneArray.length - 1] == undefined || stoneArray[stoneArray.length - 1].getGlobalPosition().x < renderer.width*0.8){
            produceStone(groundContainer);
        }
    }
}

function produceStone(groundContainer) {
    var stone = new Sprite(resources["../img/stone.png"].texture);
    stone.anchor.set(0.5, 0.5);
    stone.width = md.width * 0.6;
    stone.height = md.height * 0.6;
    stone.x = renderer.width + stone.width/2;
    stone.y = groundY - stone.height/2;
    stone.diameter = true;
    groundContainer.addChild(stone);

    stoneArray.push(stone);
}


function moveStones() {
    for (var i = 0; i < stoneArray.length; i++) {
        var stone = stoneArray[i];
        if (hit(md, stone, 0.9)) {
            gameOver("撞死啦～～")
        }
        if (stone.x < -stone.width) {
            stoneArray.remove(stone);
            stone.destroy();
            i--;
        } else{
            stone.x -= velocity;
        }
    }
}


var jumpVDynamic;
const g = suitWindowSize(-10 / 60 * 3), jumpThreshold = suitWindowSize(-24);

function jumpMd() {
    if(touchWallBottom) {
        jumpVDynamic = -jumpVDynamic/4;
        touchWallBottom = false;
        topWall = undefined;
    }
    if (jumping) {
        jumpVDynamic += g;
        md.y = md.y - jumpVDynamic;

        if (md.y + md.height / 2 >= groundY) {
            if(jumpVDynamic < jumpThreshold){
                gameOver("摔死啦～～～")
            }
            jumpVDynamic = 0;
            md.y = groundY - md.height / 2;
            jumping = false;
        }
    }
}


var rotate = 0;
const rotateG = 3 / 60;
function rollMd() {
    rotate += rotateG*(level+1);
    md.rotation = rotate;
}

W.press = function () {
    if(md.y + md.height / 2 >= groundY || phdJumpTag || supportedWall){
        jumpVDynamic = jumpV;
        jumping = true;
    }
};

function gameOver(text){
    console.log('fail');
    cancelAnimationFrame(animation);
    ENTER.press = undefined;
    allowRestart(text);
}