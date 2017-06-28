/**
 * Created by li_zhil on 23/5/17.
 */

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

function hit(md, item, tolerate) {
    try{
        var x1 = md.x;
        var x2 = item.x;
        var y1 = md.y;
        var y2 = item.y;
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) < (md.width/2 + item.width/2)*tolerate;
    }catch (TypeError){
        return false;
    }
}


Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


function allowRestart(text) {
    showCenterMessage(text+ '(Press SPACE to restart!)');
    SPACE.press = function () {
        window.location.reload(true);
        // start();
    };
}

function pauseGame(){
    pause = !pause;
    if (pause) {
        showCenterMessage("Enjoy your coffee break :)");
        console.log('pause');
        cancelAnimationFrame(animation);
    } else {
        showCenterMessage();
        console.log('resume');
        requestAnimationFrame(mdAnimation);
    }
    renderer.render(stage);
}

function showCenterMessage(text, timeInSec){
    if(text){
        centerMessage.text = text;
        centerMessage.position.set((renderer.width - centerMessage.width) / 2, renderer.height / 2 - suitWindowSize(4));
        centerMessage.visible = true;
        if(timeInSec){
            setTimeout(function () {
                centerMessage.visible = false;
            }, timeInSec*1000);
        }
    }else{
        centerMessage.visible = false;
    }
    renderer.render(centerMessage);
}