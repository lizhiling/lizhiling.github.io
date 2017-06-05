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
        if(md.y + md.height / 2 >= groundY || masterJumpTag){
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
    detectOnTopOfPropUp(md);
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
    groundContainer.addChild(stone);

    stoneArray.push(stone);
}

//test producing stair for pig to roll on
function randomProduceStair(groundContainer) {
    var frequency = 2;
    var maxStoneNo = 4;
    var r = Math.random();
    if (r < 1 / (60 * frequency) && stairArray.length < maxStoneNo) {
        if(stairArray[stairArray.length - 1] == undefined || stairArray[stairArray.length - 1].getGlobalPosition().x < renderer.width*0.8){
            produceStair(groundContainer);
        }
    }
}
function produceStair(groundContainer){
    var stair = new Sprite(resources["../img/brickwall.png"].texture);
    stair.anchor.set(0.5, 0.5);
    stair.width = md.width * 2.4; //set width of stair according to width of pig
    stair.height = md.height * 0.6;
    stair.x = renderer.width + stair.width/2;
    stair.y = groundY - stair.width; //relatively set y axis of stait equal to width of stair
    groundContainer.addChild(stair);

    stairArray.push(stair);
    console.log("stair produced");
}
function moveStairs() {
    for (var i = 0; i < stairArray.length; i++) {
        var stair = stairArray[i];
        if (stair.x < -stair.width) {
            stairArray.remove(stair);
            stair.destroy();
            i--;
        } else{
            stair.x -= velocity;
        }
    }

}

////////////////////////


function moveStones() {
    for (var i = 0; i < stoneArray.length; i++) {
        var stone = stoneArray[i];
        if (hit(md, stone, 0.95)) {
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
const g = suitWindowSize(-10 / 60 * 3), jumpThreshold = suitWindowSize(-30);


function jumpMd() {
    if (jumping) {
        console.log("md.y"+md.y);
        console.log("jumpVDynamic"+jumpVDynamic);
        jumpVDynamic += g;
        md.y = md.y - jumpVDynamic;

        if (md.y + md.height / 2 >= groundY) {
            if(jumpVDynamic < jumpThreshold){
                gameOver("摔死啦～～～")
            }
            jumpVDynamic = jumpV;
            md.y = groundY - md.height / 2;
            jumping = false;
        }

        if(detectOnTopOfPropUp(md)){
            md.y = md.width*2.9;
            jumping = false;
            console.log("pig on brick");
            tempJumpVDynamic = jumpVDynamic;
            onBrick = true;
        }

    }
}


/**
 * Detect whether element is on the top of a supportable element
 * @param ele
 */
function detectOnTopOfPropUp(ele){
    
        for(var i = 0; i<stairArray.length; i++){
            var ele2 = stairArray[i];
            if (ele2.anchor == undefined){ //ele2 is a PIXI.Graphics
                if (Math.abs(ele.x-ele.width*ele.anchor.x-ele2.getLocalBounds().x)<(ele.width+ele2.width)/2
                    && ele2.getLocalBounds().y-(ele.y-ele.height*ele.anchor.y)<=1.1*ele.height
                    && ele2.getLocalBounds().y-(ele.y-ele.height*ele.anchor.y)>0.7*ele.height){
                    return ele2;
                }
            }else if (Math.abs(ele.x-ele.width*ele.anchor.x-(ele2.x-ele2.width*ele2.anchor.x))<(ele.width+ele2.width)/2
                && ele2.y-ele2.height*ele2.anchor.y-(ele.y-ele.height*ele.anchor.y)<=1.1*ele.height
                && ele2.y-ele2.height*ele2.anchor.y-(ele.y-ele.height*ele.anchor.y)>0.7*ele.height){
                return ele2;
            }
        }
    if(onBrick){
        jumping = true;
        jumpVDynamic = tempJumpVDynamic;
        onBrick = false;
    }
    return false;
}


var rotate = 0;
const rotateG = 3 / 60;
function rollMd() {
    rotate += rotateG*(level+1);
    md.rotation = rotate;
}

W.press = function () {
    if(md.y + md.height / 2 >= groundY || masterJumpTag||detectOnTopOfPropUp(md)){
        jumpVDynamic = jumpV;
        jumping = true;
    }
};

function gameOver(text){
    console.log('fail');
    cancelAnimationFrame(animation);
    allowRestart(text);
}