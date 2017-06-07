/**
 * Created by li_zhil on 24/5/17.
 */

/**
  STAR
 **/

function randomProduceStar(skyContainer) {
    var frequency = 3;
    var r = Math.random();
    if (r < 1 / (60 * frequency)) {
        produceStar(skyContainer);
    }
}

function produceStar(skyContainer) {
    var star = new Sprite(resources["../img/star.png"].texture);
    star.name = "STAR";
    star.anchor.set(0.5, 0.5);
    star.width = getMd().width * 0.3;
    star.height = getMd().height * 0.3;
    star.x = renderer.width;
    star.y = (groundY-star.height/2) * Math.random();
    skyContainer.addChild(star);
    starArray.push(star);
}

function moveStars() {
    for (var i = 0; i < starArray.length; i++) {
        var star = starArray[i];
            if (hit(getMd(), star, 1)) {
                console.log('got star!');
                star.destroy();
                skyContainer.removeChild(star);
                starArray.remove(star);
                i--;
                starsGot ++;

                renderer.render(skyContainer);
                starBuffStartTime = new Date().getTime();
                if (starsGot === 1 || starsGot === 3){
                    var text = (starsGot === 1) ? "Master Jumping~": "PhD Jumping!!!";
                    showCenterMessage(text, 2)
                }

            }else{
                star.x -= velocity;
                if (star.x < -star.width) {
                    star.destroy();
                    skyContainer.removeChild(star);
                    starArray.remove(star);
                    i--;
                    renderer.render(skyContainer);
                }
            }

    }

    if(starBuffStartTime!==undefined && starsGot >= 1){
        jumpV = jumpVAdd + startJumpV;
    }
    if (starBuffStartTime!==undefined && starsGot >= 3){
        masterJumpTag = true;
    }

    if (starBuffStartTime!==undefined && starBuffStartTime < new Date().getTime()-10*1000){
        starBuffStartTime = undefined;
        masterJumpTag = false;
        jumpV = startJumpV;
        starsGot = 0;
    }

}

function setStarBuffStartTime(time){
    starBuffStartTime = time;
}

/**
 COMET
 **/
var comet, comet1, comet2, comet3, comet4, cometWidth, cometHeight;

function initCometParts(){
    comet1 = new Sprite(resources["../img/comet_part1x1.png"].texture);
    comet2 = new Sprite(resources["../img/comet_part1x2.png"].texture);
    comet3 = new Sprite(resources["../img/comet_part2x1.png"].texture);
    comet4 = new Sprite(resources["../img/comet_part2x2.png"].texture);

    cometWidth = getMd().width * 0.6;
    cometHeight = getMd().width * 0.6;
    comet1.position.set(0.25*cometWidth,0.25*cometHeight);
    comet2.position.set(0.75*cometWidth,0.25*cometHeight);
    comet3.position.set(0.25*cometWidth,0.75*cometHeight);
    comet4.position.set(0.75*cometWidth,0.75*cometHeight);
    comet1.height = 0.5 * cometHeight;
    comet1.width = 0.5 * cometWidth;
    comet2.height = 0.5 * cometHeight;
    comet2.width = 0.5 * cometWidth;
    comet3.height = 0.5 * cometHeight;
    comet3.width = 0.5 * cometWidth;
    comet4.height = 0.5 * cometHeight;
    comet4.width = 0.5 * cometWidth;
    comet3.anchor.set(0.5, 0.5);
}

function produceComet() {
    var rareLevel = 3;
    if(comet==null || (Math.random()<1 / (60 * rareLevel) && comet.parent==null)) {
        comet = new Container();
        comet.x = (Math.random() * 0.25 + 0.75) * renderer.width;
        comet.y = 0;
        // comet.pivot.x = 0.5;
        // comet.pivot.y = 0.5;
        comet.cometSpeedX = velocity + suitWindowSize(4) + Math.random() * suitWindowSize(4);
        comet.cometSpeedY = velocity + suitWindowSize(4) + Math.random() * suitWindowSize(4);
        // comet.cometSpeedY = comet.cometSpeedX * (getMd().y-comet.y)/(comet.x - getMd().x);
        // comet.width = getMd().width * 0.6;
        // comet.height = getMd().height * 0.6;
        // random locate it in the range of top right corner (y=0 && 3/4*width<x<width)
        skyContainer.addChild(comet);

        comet.addChild(comet1);
        comet.addChild(comet2);
        comet.addChild(comet3);
        comet.addChild(comet4);
    }
}

function detectAnyInteraction(item, container){
    if(Array.isArray( container.children )){
        for ( var i = 0; i < container.children.length; ++i ) {
            var detectedResult = detectAnyInteraction( item, container.children[i] );
            if(detectedResult){
                return detectedResult;
            }
        }
    }
    if (container.texture && container!=item) {
        // get global x,y of container
        var x = container.getGlobalPosition().x;
        var y = container.getGlobalPosition().y;
        var xi = item.getGlobalPosition().x;
        var yi = item.getGlobalPosition().y;
        if(Math.sqrt((x-xi)*(x-xi) + (y-yi)*(y-yi)) < (container.width/2 + item.width/2))
            return container;
    }
}

function moveComet() {
    if(comet!=null && comet.parent != null){
        var result = detectAnyInteraction(comet3, groundContainer);
        if (result ){
            console.log(result.name);
            if(result == getMd()){
                gameOver("彗星长长的尾巴扫过了你。。你挂了");
            }else{
                result.parent.removeChild(result);
                result = null;
                renderer.render(groundContainer);
            }
        } else {
            comet.x -= comet.cometSpeedX;
            comet.y +=comet.cometSpeedY;
            if (comet.x < -cometWidth || comet.y > renderer.height + cometHeight) {
                // comet.destroy(true);
                skyContainer.removeChild(comet);
                renderer.render(skyContainer);
            }
        }
        // if (hit(getMd(), comet, 0.7)) {
        //     console.log('Hit comet!');
        //     // comet.destroy(true);
        //     skyContainer.removeChild(comet);
        //     renderer.render(skyContainer);
        // } else {
        //     comet.x -= comet.cometSpeedX;
        //     comet.y +=comet.cometSpeedY;
        //     if (comet.x < -cometWidth || comet.y > renderer.height + cometHeight) {
        //         // comet.destroy(true);
        //         skyContainer.removeChild(comet);
        //         renderer.render(skyContainer);
        //     }
        // }
    }
}