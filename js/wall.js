/**
 * Created by li_zhil on 27/6/17.
 */

function randomProduceWall(skyContainer) {
    var frequency = 3;
    var r = Math.random();
    if (r < 1 / (60 * frequency)) {
        produceWall(skyContainer);
    }
}

function produceWall(skyContainer) {
    var wall = new Sprite(resources["../img/wall.png"].texture);
    wall.height = getMd().height * 0.4;
    wall.width = wall.height*2 + wall.height * 3 * Math.random();
    wall.x = renderer.width;
    wall.y = (renderer.height*0.65-wall.height) * (0.8*Math.random() + 0.2);
    wall.mass = Number.MAX_SAFE_INTEGER;
    var fakeRate = Math.random();
    if(fakeRate < 0.5){
        wall.fake = true;
    }
    skyContainer.addChild(wall);
    wallArray.push(wall);
}

var stackedWall, supportedWall, topWall, fakeWall;
function moveWall() {
    bump.hit(getMd(), wallArray, true, true, true, function (collision, platform) {
        if(!fakeWall && platform.fake){
            // crash the wall randomly
            fakeWall = platform;
            wallArray.remove(fakeWall);
            fakeWallAnimation();
        }

        if(!platform.fake){
            if (collision === 'bottom'){
                touchWallTop = true;
                supportedWall = platform;
            }else if (collision === 'top'){
                touchWallBottom = true;
                topWall = platform;
            }else if (collision === 'right') {
                touchWallLeft = true;
                stackedWall = platform;
            }
        }
    });

    if(!touchWallLeft){
        for (var i = 0; i < wallArray.length; i++) {
            var wall = wallArray[i];
            wall.x -= velocity;
            if (wall.x < -wall.width) {
                wall.destroy();
                skyContainer.removeChild(wall);
                wallArray.remove(wall);
                i--;
                renderer.render(skyContainer);
            }
        }
    }

    if(stackedWall){
        if (stackedWall.getGlobalPosition().y-getMd().y > 0.5 * getMd().height
            || getMd().y -stackedWall.getGlobalPosition().y > 0.5 * getMd().height+stackedWall.height){
            touchWallLeft = false;
            stackedWall = undefined;
        }
    }
    if(supportedWall){
        if(supportedWall.getGlobalPosition().x - getMd().x > 0.5 * getMd().width
            || getMd().x - supportedWall.getGlobalPosition().x > 0.5 * getMd().width+supportedWall.width){
            touchWallTop = false;
            supportedWall = undefined;
        }
    }
}