/**
 * Created by li_zhil on 23/5/17.
 */
var groundContainerA, groundContainerB, md, dog, groundLine;

function renderNewGround(groundContainer, groundY) {
    md = new Sprite(resources["../img/atlas.png"].texture);
    md.height = 0.15 * renderer.height;
    md.width = md.height;
    md.x = 0.2 * renderer.width;
    md.y = groundY - md.height / 2;
    md.anchor.x = 0.5;
    md.anchor.y = 0.5;

    dog = new Sprite(resources["../img/dog1.png"].texture);
    dog.height = md.height;
    dog.width = md.width;
    dog.x = 0.2 * renderer.width;
    dog.y = groundY - 3*md.height / 2;
    dog.anchor.x = 0.5;
    dog.anchor.y = 0.5;

    md.jumpVDynamic = 0;
    dog.jumpVDynamic = 0;
    md.jumping = false;
    dog.jumping = false;
    md.masterJumpTag = false;
    dog.masterJumpTag = false;
    md.buffTimeout = undefined;
    dog.buffTimeout = undefined;

    groundContainer.addChild(md);
    groundContainer.addChild(dog);

    ableToPropUpArray.push(md);
    ableToPropUpArray.push(dog);

    groundContainerA = new Container();
    groundContainerB = new Container();

    groundLine = new Graphics();
    groundLine.lineStyle(4, 0xFFFFFF, 1);
    groundLine.moveTo(0, groundY);
    groundLine.lineTo(renderer.width, groundY);
    groundContainer.addChild(groundLine);
    ableToPropUpArray.push(groundLine);

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

    // document.getElementsByTagName('canvas')[0].onclick = function () {
    //     if(md.y + md.height / 2 >= groundY || masterJumpTag){
    //         jumpVDynamic = jumpV;
    //         jumping = true;
    //     }
    // };
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

function getDog() {
    return dog;
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


function moveStones() {
    for (var i = 0; i < stoneArray.length; i++) {
        var stone = stoneArray[i];
        if (hit(md, stone, 0.95) || hit(dog, stone, 0.95)) {
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

const g = suitWindowSize(-10 / 60 * 3), jumpThreshold = suitWindowSize(-30);

function jump(character_ele) {
    var supportEle = detectOnTopOfPropUp(character_ele);
    if (character_ele.jumping) {
        character_ele.jumpVDynamic += g;
        character_ele.y = character_ele.y - character_ele.jumpVDynamic;
    } else if (!character_ele.jumping && supportEle==null) {
        character_ele.jumpVDynamic += g;
        character_ele.y = character_ele.y - character_ele.jumpVDynamic;
    }
    if (supportEle!=null) {
        if(character_ele.jumpVDynamic < jumpThreshold){
            gameOver("摔死啦～～～")
        }
        character_ele.jumping = false;
        character_ele.jumpVDynamic = 0;
        if(supportEle.anchor == undefined){
            character_ele.y = supportEle.getLocalBounds().y - character_ele.height / 2;
        }else{
            character_ele.y = supportEle.y - supportEle.height*supportEle.anchor.y - character_ele.height / 2;
        }
    }
}

/**
 * Detect whether element is on the top of a supportable element
 * @param ele
 */
function detectOnTopOfPropUp(ele){
    if(ele.jumpVDynamic<=0){
        for(var i = 0; i<ableToPropUpArray.length; i++){
            var ele2 = ableToPropUpArray[i];
            if (ele2.anchor == undefined){ //ele2 is a PIXI.Graphics
                if (Math.abs(ele.x-ele.width*ele.anchor.x-ele2.getLocalBounds().x)<(ele.width+ele2.width)/2
                    && ele2.getLocalBounds().y-(ele.y-ele.height*ele.anchor.y)<=1.1*ele.height
                    && ele2.getLocalBounds().y-(ele.y-ele.height*ele.anchor.y)>0.7*ele.height){
                    return ele2;
                }
            }else if (Math.abs(ele.x-ele.width*ele.anchor.x-(ele2.x-ele2.width*ele2.anchor.x))<(ele.width+ele2.width)/2
                && ele2.y-ele2.height*ele2.anchor.y-(ele.y-ele.height*ele.anchor.y)<=1.1*ele.height
                && ele2.y-ele2.height*ele2.anchor.y-(ele.y-ele.height*ele.anchor.y)>0.9*ele.height){
                return ele2;
            }
        }
    }
    return null;
}

function jumpMd() {
    jump(md)
}


function jumpDog() {
    jump(dog)
}

var rotate = 0;
const rotateG = 3 / 60;
function rollMd() {
    rotate += rotateG*(level+1);
    md.rotation = rotate;
}

W.press = function () {
    if(md.y + md.height / 2 >= groundY || md.masterJumpTag || detectOnTopOfPropUp(md)){
        md.jumpVDynamic = jumpV;
        md.jumping = true;
    }
};

P.press = function () {
    if(dog.y + dog.height / 2 >= groundY || dog.masterJumpTag || detectOnTopOfPropUp(dog)){
        dog.jumpVDynamic = jumpV;
        dog.jumping = true;
    }
};

function gameOver(text){
    console.log('fail');
    cancelAnimationFrame(animation);
    ENTER.press = undefined;
    allowRestart(text);
}