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

var starBuffStartTime = undefined;
function moveStars() {
    for (var i = 0; i < starArray.length; i++) {
        var star = starArray[i];

            if (hit(getMd(), star, 1)) {
                console.log('got star!');
                star.destroy();
                skyContainer.removeChild(star);
                starArray.remove(star);
                i--;

                renderer.render(skyContainer);
                if (starBuffStartTime===undefined){
                    startJumpV += velocity;
                    starBuffStartTime = new Date().getTime();
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

    if(starBuffStartTime!==undefined && starBuffStartTime < new Date().getTime()-10*1000){
        starBuffStartTime = undefined;
        startJumpV -= velocity;
    }

}

function getStarBuffStartTime(){
    return starBuffStartTime;
}

function setStarBuffStartTime(time){
    starBuffStartTime = time;
}