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
        if(hit(getMd(), star, 1)){
            i--;
            gotStar(getMd(), star);
        } else if (hit(getDog(), star, 1)) {
            i--;
            gotStar(getDog(), star);
        } else {
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
}

function gotStar(character, star){
    console.log('Mengdan got star!');
    star.destroy();
    skyContainer.removeChild(star);
    starArray.remove(star);
    updateBuff(character);
    renderer.render(skyContainer);
}

/**
 * note: do not use this to clear buff
 * @param character
 */
function updateBuff(character){
    character.starsGot = character.starsGot + 1;
    if (character.starsGot === 1 || character.starsGot === 3) {
        var text = (character.starsGot === 1) ? "Master Jumping~" : "PhD Jumping!!!";
        showCenterMessage(text, 2);
    }
    if(character.starsGot >=3){
        character.masterJumpTag = true;
    }else {
        character.jumpV = jumpVAdd + startJumpV;
    }
    character.buffTimeout = setTimeout(function () {
        character.masterJumpTag = false;
        character.jumpV = startJumpV;
        character.starsGot = 0;
    }, 10)
}