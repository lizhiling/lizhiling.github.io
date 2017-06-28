/**
 * Created by li_zhil on 24/5/17.
 */

function randomProduceStar(skyContainer) {
    var frequency = 3;
    var r = Math.random();
    if (r < 1 / (60 * frequency)) {
        produceStar(skyContainer);
    }
}

function produceStar(skyContainer) {
    var star = new Sprite(resources["../img/star.png"].texture);
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
            if (bump.hit(getMd(), star)) {
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