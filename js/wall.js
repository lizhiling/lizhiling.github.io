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
    wall.y = (groundY-wall.height) * (Math.random() * 0.5 + 0.4);
    wall.mass = Number.MAX_SAFE_INTEGER;
    skyContainer.addChild(wall);
    wallArray.push(wall);
}

var stackedWall;
function moveWall() {
    for (var i = 0; i < wallArray.length; i++) {
        var wall = wallArray[i];
        var hitPoint = bump.hit(getMd(), wall, true, true, true);
        if (hitPoint == 'right') {
            touchWallLeft = true;
            stackedWall = wall
        }else {
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
        if (getMd().y - stackedWall.getGlobalPosition().y > 0.5 * getMd().height
            || stackedWall.getGlobalPosition().y -getMd().y > 0.5 * getMd().height+stackedWall.height){
            touchWallLeft = false;
            stackedWall = undefined;
        }
    }
}